import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Checkbox,
  Input,
} from "@nextui-org/react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Mail } from "../../icons/Mail";
import { EyeFilledSlash } from "../../icons/EyeFilledSlash";
import { EyeFilled } from "../../icons/EyeFilled";
import { useAuth } from "../../../hooks/useAuth";
import { Popups, usePopups } from "../../../hooks/usePopups";

export function LoginPopup() {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { popups, togglePopup } = usePopups();
  const { login } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Modal
      isOpen={popups[Popups.Login]}
      onClose={() => togglePopup(Popups.Login)}
      placement="top-center"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Accede a tu cuenta
            </ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                endContent={
                  <Mail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Correo electrónico"
                variant="bordered"
                onValueChange={(value) => {
                  emailRef.current = value;
                }}
              />
              <Input
                label="Contraseña"
                type={isVisible ? "text" : "password"}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeFilledSlash className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilled className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                variant="bordered"
                onValueChange={(value) => {
                  passwordRef.current = value;
                }}
              />
              <div className="flex py-2 px-1 justify-between">
                <Checkbox
                  classNames={{
                    label: "text-small",
                  }}
                >
                  Recordar
                </Checkbox>
                <Link
                  color="primary"
                  className="text-[#1C64F2]"
                  href="#"
                  size="sm"
                >
                  Olvidaste tu contraseña?
                </Link>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Cerrar
              </Button>
              <Button
                color="primary"
                onPress={async () => {
                  setIsLoading(true);

                  await login({
                    email: emailRef.current,
                    password: passwordRef.current,
                  });

                  onClose();
                }}
                isLoading={isLoading ? true : false}
              >
                Acceder
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
