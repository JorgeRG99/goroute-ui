import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { Textarea } from "@nextui-org/react";
import { useState } from "react";
import { Popups, usePopups } from "../../../hooks/usePopups";
import { Button, Input } from "@nextui-org/react";
import { useUserSessionStore } from "../../../store/userSession";
import { useUserDataValidator } from "../../../hooks/FormValidationsHooks/useUserDataValidator";

export default function EditProfilePopup() {
  const [isLoading, setIsLoading] = useState(false);
  const userData = useUserSessionStore((state) => state.userData);
  const updateUserData = useUserSessionStore((state) => state.updateUserData);
  const { popups, togglePopup } = usePopups();
  const [userNewData, setUserNewData] = useState({
    name: userData.name,
    surname: userData.surname,
    username: userData.username,
    biography: userData.biography ? userData.biography : null,
  });
  const {
    isNameInvalid,
    isSurnameInvalid,
    isUsernameInvalid,
    isBiographyInvalid,
    serverErrors,
    catchEmptyValues,
    catchedServerErrors,
  } = useUserDataValidator(userNewData);

  const handleUpdateUserData = async () => {
    setIsLoading(true);

    const catchedEmptyData = catchEmptyValues();

    if (!catchedEmptyData) {
      const response = await updateUserData(userNewData);
      const errorOcurred = catchedServerErrors(response);

      if (!errorOcurred) togglePopup(Popups.EditUser);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const handleUserDataChange = (e) => {
    setUserNewData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Modal
      isOpen={popups[Popups.EditUser]}
      onClose={() => togglePopup(Popups.EditUser)}
      placement="center"
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-center">
              Edita tu perfil
            </ModalHeader>
            <ModalBody>
              <Input
                size="sm"
                label="Nombre"
                variant="bordered"
                name="name"
                autoComplete="name"
                isInvalid={isNameInvalid}
                errorMessage={
                  isNameInvalid && "Por favor, utiliza solo letras y espacios."
                }
                defaultValue={userNewData.name}
                onChange={handleUserDataChange}
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
                defaultValue={userNewData.surname}
                onChange={handleUserDataChange}
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
                defaultValue={userNewData.username}
                onChange={handleUserDataChange}
              />
              <Textarea
                label="Biografía"
                name="biography"
                defaultValue={userData.biography ?? userNewData.biography}
                placeholder={
                  !userData.biography ? "Añade una biografía" : undefined
                }
                isInvalid={isBiographyInvalid}
                errorMessage={
                  isBiographyInvalid &&
                  "Por favor, utiliza solo letras, espacios y los siguientes signos de puntuación (.,¿?!¡-_), con un máximo de 100 caracteres"
                }
                variant="bordered"
                onChange={handleUserDataChange}
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
                  isLoading={isLoading ? true : false}
                  onPress={handleUpdateUserData}
                  isDisabled={
                    isNameInvalid ||
                    isSurnameInvalid ||
                    isUsernameInvalid ||
                    isBiographyInvalid
                      ? true
                      : false
                  }
                >
                  Actualizar
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
