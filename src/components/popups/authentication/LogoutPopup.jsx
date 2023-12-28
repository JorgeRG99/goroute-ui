import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { Danger } from "./../../icons/Danger";
import { Popups, usePopups } from "../../../hooks/usePopups";
import { useUserSessionStore } from "../../../store/userSession";

export default function LogoutPopup() {
  const { popups, togglePopup } = usePopups();
  const logout = useUserSessionStore((state) => state.logout);

  return (
    <Modal
      backdrop="blur"
      size="xs"
      className="bg-gradient-to-br from-white via-white to-slate-200"
      isOpen={popups[Popups.Logout]}
      onClose={() => togglePopup(Popups.Logout)}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className=" flex gap-[70px] justify-start">
              <Danger />
              <p>¡Atención!</p>
            </ModalHeader>
            <ModalBody className="text-center">
              Estás a punto de cerrar sesión. ¿Quieres continuar?
            </ModalBody>
            <ModalFooter className="flex justify-evenly">
              <Button
                color="danger"
                variant="flat"
                onPress={() => {
                  logout();
                  onClose();
                }}
              >
                Cerrar Sesión
              </Button>
              <Button color="primary" variant="flat" onPress={onClose}>
                Continuar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
