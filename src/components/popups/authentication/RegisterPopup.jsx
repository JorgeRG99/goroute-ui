import { useRef, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { Popups, usePopups } from "../../../hooks/usePopups";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Input,
  Button,
} from "@nextui-org/react";
import { Mail } from "../../icons/Mail";
import { EyeFilled } from "../../icons/EyeFilled";
import { EyeFilledSlash } from "../../icons/EyeFilledSlash";

export const RegisterPopup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { popups, togglePopup } = usePopups();

  const nameRef = useRef();
  const surnameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const birthRef = useRef();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const { register } = useAuth();

  const handleSubmit = async () => {
    setIsLoading(true);

    await register({
      username: usernameRef.current,
      name: nameRef.current,
      surname: surnameRef.current,
      birth: birthRef.current,
      email: emailRef.current,
      password: passwordRef.current,
    });

    togglePopup(Popups.Register);
  };

  return (
    <Modal
      isOpen={popups[Popups.Register]}
      onClose={() => togglePopup(Popups.Register)}
      placement="top-center"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-center">
              Registra una cuenta
            </ModalHeader>
            <ModalBody>
              <Input
                size="sm"
                autoFocus
                label="Nombre"
                variant="bordered"
                onValueChange={(value) => {
                  nameRef.current = value;
                }}
              />
              <Input
                size="sm"
                label="Apellidos"
                variant="bordered"
                onValueChange={(value) => {
                  surnameRef.current = value;
                }}
              />
              <Input
                size="sm"
                label="Nombre de usuario"
                variant="bordered"
                onValueChange={(value) => {
                  usernameRef.current = value;
                }}
              />
              <Input
                size="sm"
                label="Correo electrónico"
                endContent={
                  <Mail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                variant="bordered"
                onValueChange={(value) => {
                  emailRef.current = value;
                }}
              />
              <Input
                size="sm"
                label="Contraseña"
                variant="bordered"
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
                onValueChange={(value) => {
                  passwordRef.current = value;
                }}
              />
              <Input
                size="sm"
                label="Confirmar Contraseña"
                type={isVisible ? "text" : "password"}
                variant="bordered"
                onValueChange={(value) => {
                  confirmPasswordRef.current = value;
                }}
              />
              <Input
                size="sm"
                type="date"
                variant="bordered"
                onValueChange={(value) => {
                  birthRef.current = value;
                }}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Cerrar
              </Button>
              <Button
                color="primary"
                isLoading={isLoading ? true : false}
                onPress={handleSubmit}
              >
                Registrar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
