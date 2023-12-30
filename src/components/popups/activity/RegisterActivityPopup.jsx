import { Modal, ModalContent, ModalHeader } from "@nextui-org/react";
import { CreateActivityForm } from "./CreateActivityForm";
import { Popups, usePopups } from "../../../hooks/usePopups";

export default function RegisterActivityPopup() {
  const { popups, togglePopup } = usePopups();

  return (
    <Modal
      isOpen={popups[Popups.AddActivity]}
      onClose={() => togglePopup(Popups.AddActivity)}
      placement="top-center"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-center">
              Publica una actividad
            </ModalHeader>
            <CreateActivityForm onClose={onClose} />
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
