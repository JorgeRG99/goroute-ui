import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Mail } from "../icons/Mail";
import { Spinner } from "@nextui-org/spinner";
import { useRef, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Popups, usePopups } from "../../hooks/usePopups";
import { Button, Checkbox } from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import { Link } from "react-router-dom";
import { EyeFilledSlash } from "../icons/EyeFilledSlash";
import { EyeFilled } from "../icons/EyeFilled";

export function LoginPopup() {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const { login } = useAuth();
  const { popups, togglePopup } = usePopups();

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
              >
                {isLoading ? (
                  <Spinner color="secondary" size="sm" />
                ) : (
                  "Acceder"
                )}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
