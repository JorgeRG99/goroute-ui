import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  Input,
  Tooltip,
} from "@nextui-org/react";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { useUserPostsStore } from "../../../store/userPosts";
import { TagTooltip } from "../../Tooltips/TagTooltip";
import { QuestionMark } from "../../Icons/QuestionMark";

export default function EditPostPopup({ postData, isOpen, onOpenChange }) {
  const [isLoading, setIsLoading] = useState(false);
  const editPost = useUserPostsStore((state) => state.editPost);

  const formattedTags = `#${postData.tags.join("#")}`;

  const postNewData = {
    titleRef: useRef(),
    contentRef: useRef(),
    tagsRef: useRef(),
  };

  const handleEditPost = async () => {
    setIsLoading(true);

    const newContent =
      postNewData.contentRef.current &&
      postNewData.contentRef.current
        .split("\n")
        .filter((paragraph) => paragraph);

    const newTags =
      postNewData.tagsRef.current &&
      postNewData.tagsRef.current.split("#").filter((tag) => tag);

    const updatedPostData = Object.fromEntries(
      Object.entries({
        id: postData.id,
        title: postNewData.titleRef.current,
        content: newContent,
        tags: newTags,
      }).filter((entry) => entry[1] !== undefined)
    );

    await editPost(updatedPostData);

    setIsLoading(false);
    onOpenChange();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-center">
              Editar Actividad
            </ModalHeader>
            <ModalBody>
              <ModalBody className="px-0">
                <Input
                  label="Título"
                  defaultValue={postData.title}
                  variant="bordered"
                  onValueChange={(value) => {
                    postNewData.titleRef.current = value;
                  }}
                />
                <Textarea
                  size="md"
                  label="Contenido"
                  defaultValue={postData.content}
                  variant="bordered"
                  onValueChange={(value) => {
                    postNewData.contentRef.current = value;
                  }}
                />
                <span className="flex items-center gap-[1em]">
                  <Input
                    label="Tags"
                    variant="bordered"
                    defaultValue={formattedTags}
                    onValueChange={(value) => {
                      postNewData.tagsRef.current = value;
                    }}
                  />
                  <Tooltip content={<TagTooltip />}>
                    <span className="w-[1.9em] h-[1.7em] bg-secondary-blurred rounded-full flex items-center justify-center">
                      <QuestionMark />
                    </span>
                  </Tooltip>
                </span>
              </ModalBody>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="flat"
                onPress={onOpenChange}
                isDisabled={isLoading ? true : false}
              >
                Cerrar
              </Button>
              <Button
                color="primary"
                isLoading={isLoading ? true : false}
                onPress={handleEditPost}
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

EditPostPopup.propTypes = {
  postData: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
};
