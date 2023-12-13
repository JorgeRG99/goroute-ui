import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import { Popups, usePopups } from "../../../hooks/usePopups";

export function FollowersPopup() {
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
            <ModalBody></ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
