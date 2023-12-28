import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { Textarea } from "@nextui-org/react";
import { useRef, useState } from "react";
import { Popups, usePopups } from "../../../hooks/usePopups";
import { Button, Input } from "@nextui-org/react";
import { useUserSessionStore } from "../../../store/userSession";
import { userEdit } from "../../../services/user";

export default function EditProfilePopup() {
  const [isLoading, setIsLoading] = useState(false);
  const userData = useUserSessionStore((state) => state.userData);
  const authToken = useUserSessionStore((state) => state.authToken);
  const updateUserData = useUserSessionStore((state) => state.updateUserData);
  const { popups, togglePopup } = usePopups();
  const nameRef = useRef();
  const surnameRef = useRef();
  const usernameRef = useRef();
  const biographyRef = useRef();

  const handleSubmit = async () => {
    setIsLoading(true);

    const updatedUserData = {
      username: usernameRef.current,
      name: nameRef.current,
      surname: surnameRef.current,
      biography: biographyRef.current,
    };

    await userEdit(updatedUserData, authToken);

    updateUserData(updatedUserData);

    togglePopup(Popups.EditUser);
  };

  return (
    <Modal
      isOpen={popups[Popups.EditUser]}
      onClose={() => togglePopup(Popups.EditUser)}
      placement="top-center"
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
                placeholder={userData.name}
                onValueChange={(value) => {
                  nameRef.current = value;
                }}
              />
              <Input
                size="sm"
                label="Apellidos"
                variant="bordered"
                placeholder={userData.surname}
                onValueChange={(value) => {
                  surnameRef.current = value;
                }}
              />
              <Input
                size="sm"
                label="Nombre de usuario"
                variant="bordered"
                placeholder={userData.username}
                onValueChange={(value) => {
                  usernameRef.current = value;
                }}
              />
              <Textarea
                label="Biografía"
                placeholder={userData.biography ?? "Añade una biografía"}
                variant="bordered"
                onValueChange={(value) => {
                  biographyRef.current = value;
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
                Actualizar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
