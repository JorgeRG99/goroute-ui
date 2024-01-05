import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useState } from "react";
import { Danger } from "../../icons/Danger";
import PropTypes from "prop-types";
import { useComments } from "../../../hooks/useComments";

export default function DeleteCommentPopup({
  isOpen,
  onOpenChange,
  commentId,
  setPostComments,
  setCommentsNumber,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { deleteComment } = useComments();

  const handleCommentDelete = async () => {
    setIsLoading(true);

    await deleteComment(commentId);

    setPostComments((prevState) =>
      prevState.filter((comment) => comment.id !== commentId)
    );

    setCommentsNumber((prevState) => prevState - 1);

    setIsLoading(false);
    onOpenChange();
  };

  return (
    <>
      <Modal
        backdrop="blur"
        size="sm"
        className="bg-gradient-to-br from-white via-white to-slate-200"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className=" flex  gap-[5.6em] justify-start">
                <Danger />
                <p>¡Atención!</p>
              </ModalHeader>
              <Divider />
              <ModalBody className="gap-[2em] pt-[1em] px-[2em]">
                <p>
                  Estás a punto de eliminar tu comentario, no podrás revertir
                  esta acción.
                </p>
                <p>¿Estás seguro de que deseas continuar?</p>
              </ModalBody>
              <ModalFooter className="flex justify-evenly">
                <Button
                  color="danger"
                  variant="flat"
                  onPress={handleCommentDelete}
                  isLoading={isLoading ? true : false}
                >
                  Eliminar
                </Button>
                <Button
                  color="primary"
                  variant="flat"
                  onPress={onOpenChange}
                  isDisabled={isLoading ? true : false}
                >
                  Mantener
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

DeleteCommentPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  commentId: PropTypes.string.isRequired,
  setPostComments: PropTypes.func.isRequired,
  setCommentsNumber: PropTypes.func.isRequired,
};
