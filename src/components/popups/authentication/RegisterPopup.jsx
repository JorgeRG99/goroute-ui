import { useState } from "react";
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
import { useUserSessionStore } from "../../../store/userSession";
import { useRegisterFormValidator } from "../../../hooks/FormValidationsHooks/useRegisterFormValidator";

export default function RegisterPopup() {
  const register = useUserSessionStore((state) => state.register);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { popups, togglePopup } = usePopups();
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [registerData, setRegisterData] = useState({
    username: "",
    name: "",
    surname: "",
    birth: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const {
    isNameInvalid,
    isSurnameInvalid,
    isUsernameInvalid,
    isEmailInvalid,
    isPasswordInvalid,
    isPasswordConfirmInvalid,
    isBirthDateInvalid,
    serverErrors,
    catchEmptyValues,
    catchedServerErrors,
  } = useRegisterFormValidator(registerData);

  const handleFormChange = (e) => {
    setRegisterData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const catchedEmptyData = catchEmptyValues();

    if (!catchedEmptyData) {
      const response = await register(registerData);
      const errorOcurred = catchedServerErrors(response);

      if (!errorOcurred) togglePopup(Popups.Register);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  return (
    <Modal
      isOpen={popups[Popups.Register]}
      onClose={() => togglePopup(Popups.Register)}
      placement="top-center"
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-center">
              Registrar una cuenta
            </ModalHeader>
            <ModalBody className="flex flex-col items-center gap-[1em]">
              <Input
                size="sm"
                autoFocus
                label="Nombre"
                variant="bordered"
                name="name"
                autoComplete="name"
                isInvalid={isNameInvalid}
                errorMessage={
                  isNameInvalid && "Por favor, utiliza solo letras y espacios."
                }
                color={isNameInvalid ? "danger" : undefined}
                onChange={handleFormChange}
              />
              <Input
                size="sm"
                label="Apellidos"
                variant="bordered"
                name="surname"
                autoComplete="last name"
                isInvalid={isSurnameInvalid}
                errorMessage={
                  isSurnameInvalid &&
                  "Por favor, utiliza solo letras y espacios."
                }
                color={isSurnameInvalid ? "danger" : undefined}
                onChange={handleFormChange}
              />
              <Input
                size="sm"
                label="Nombre de usuario"
                variant="bordered"
                name="username"
                autoComplete="username"
                isInvalid={isUsernameInvalid}
                errorMessage={
                  isUsernameInvalid &&
                  "El nombre de usuario debe contener entre 3 y 20 caracteres y solo puede contener letras, números y guiones bajos (_)."
                }
                color={isUsernameInvalid ? "danger" : undefined}
                onChange={handleFormChange}
              />
              <Input
                size="sm"
                label="Correo electrónico"
                name="email"
                autoComplete="email"
                isInvalid={isEmailInvalid}
                errorMessage={
                  isEmailInvalid &&
                  "Por favor, introduce una dirección de correo electrónico válida."
                }
                color={isEmailInvalid ? "danger" : undefined}
                endContent={
                  <Mail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                variant="bordered"
                onChange={handleFormChange}
              />
              <Input
                size="sm"
                label="Contraseña"
                variant="bordered"
                type={isVisible ? "text" : "password"}
                name="password"
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
                isInvalid={isPasswordInvalid}
                errorMessage={
                  isPasswordInvalid &&
                  "La contraseña debe tener al menos 8 caracteres, incluyendo un número, una letra mayúscula y una minúscula."
                }
                color={isPasswordInvalid ? "danger" : undefined}
                onChange={handleFormChange}
              />
              <Input
                size="sm"
                label="Confirmar Contraseña"
                type={isVisible ? "text" : "password"}
                variant="bordered"
                name="passwordConfirm"
                isInvalid={isPasswordConfirmInvalid}
                errorMessage={
                  isPasswordConfirmInvalid && "Las contraseñas no coinciden"
                }
                color={isPasswordConfirmInvalid ? "danger" : undefined}
                onChange={handleFormChange}
              />
              <Input
                size="sm"
                type="date"
                name="birth"
                isInvalid={isBirthDateInvalid}
                errorMessage={
                  isBirthDateInvalid && "Debes tener al menos 5 años."
                }
                variant="bordered"
                onChange={handleFormChange}
              />
            </ModalBody>
            <ModalFooter className="pt-[1em] flex flex-col gap-[2em]">
              {serverErrors && (
                <p className="text-danger text-[.85em]">{serverErrors}</p>
              )}
              <div className="flex gap-[1em] justify-end">
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cerrar
                </Button>
                <Button
                  color="primary"
                  isDisabled={
                    isNameInvalid ||
                    isSurnameInvalid ||
                    isUsernameInvalid ||
                    isEmailInvalid ||
                    isPasswordInvalid ||
                    isPasswordConfirmInvalid
                      ? true
                      : false
                  }
                  isLoading={isLoading ? true : false}
                  onPress={handleSubmit}
                >
                  Registrar
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
