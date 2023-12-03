import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Danger } from "./../icons/Danger";
import { Popups, usePopups } from "../../hooks/usePopups";
import { useAuth } from "../../hooks/useAuth";

export function LogoutPopup() {
  const { popups, togglePopup } = usePopups();
  const { logout } = useAuth();

  return (
    <Modal
      backdrop="blur"
      size="xs"
      className="bg-gradient-to-br from-white via-white to-slate-200"
      isOpen={popups[Popups.Logout]}
      onClose={() => togglePopup(Popups.Logout)}
    >
      <ModalContent>
        {(displayLogoutPopup) => (
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
                  displayLogoutPopup();
                }}
              >
                Cerrar Sesión
              </Button>
              <Button
                color="primary"
                variant="flat"
                onPress={displayLogoutPopup}
              >
                Continuar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default LogoutPopup;
