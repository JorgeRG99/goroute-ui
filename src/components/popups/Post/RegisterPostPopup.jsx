import { Modal, ModalContent, ModalHeader } from "@nextui-org/react";
import { CreatePostForm } from "./CreatePostForm";
import { Popups, usePopups } from "../../../hooks/usePopups";

export default function RegisterPostPopup() {
  const { popups, togglePopup } = usePopups();

  return (
    <Modal
      isOpen={popups[Popups.AddPost]}
      onClose={() => togglePopup(Popups.AddPost)}
      placement="top-center"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-center">
              Creau una publicación
            </ModalHeader>
            <CreatePostForm onClose={onClose} />
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
