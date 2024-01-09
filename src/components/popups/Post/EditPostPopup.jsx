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
import { useState } from "react";
import { useUserPostsStore } from "../../../store/userPosts";
import { TagTooltip } from "../../Tooltips/TagTooltip";
import { QuestionMark } from "../../Icons/QuestionMark";
import { usePostDataValidator } from "../../../hooks/FormValidationsHooks/usePostDataValidator";

export default function EditPostPopup({ postData, isOpen, onOpenChange }) {
  const [isLoading, setIsLoading] = useState(false);
  const editPost = useUserPostsStore((state) => state.editPost);
  const formattedTags = `#${postData.tags.join("#")}`;
  const formattedContent = `${postData.content.join("\n")}`;
  const [postNewData, setPostNewData] = useState({
    id: postData.id,
    title: postData.title,
    content: formattedContent,
    tags: formattedTags,
  });

  const {
    isTitleInvalid,
    isContentInvalid,
    isTagsInvalid,
    serverErrors,
    catchEmptyValues,
    catchedServerErrors,
  } = usePostDataValidator(postNewData);

  const handleEditPost = async () => {
    setIsLoading(true);

    const catchedEmptyData = catchEmptyValues();

    if (!catchedEmptyData) {
      const newContent = postNewData.content
        .split("\n")
        .filter((paragraph) => paragraph);

      const newTags = postNewData.tags.split("#").filter((tag) => tag);

      const response = await editPost({
        ...postNewData,
        content: newContent,
        tags: newTags,
      });

      const errorOcurred = catchedServerErrors(response);

      if (!errorOcurred) onOpenChange();
      setIsLoading(false);
    }

    setIsLoading(false);
  };

  const handlePostNewDataChange = (e) => {
    setPostNewData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      backdrop="blur"
    >
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
                  name="title"
                  defaultValue={postData.title}
                  variant="bordered"
                  isInvalid={isTitleInvalid}
                  isRequired
                  labelPlacement="outside"
                  size="md"
                  errorMessage={
                    isTitleInvalid &&
                    "Por favor, utiliza solo letras, espacios y los siguientes signos de puntuación (.,¿?!¡-_%&/), con un mínimo de 10 caracteres y máximo de 30 caracteres"
                  }
                  color={isTitleInvalid ? "danger" : undefined}
                  onChange={handlePostNewDataChange}
                />
                <Textarea
                  label="Contenido"
                  defaultValue={postData.content}
                  variant="bordered"
                  name="content"
                  isInvalid={isContentInvalid}
                  isRequired
                  labelPlacement="outside"
                  size="md"
                  errorMessage={
                    isContentInvalid &&
                    "Por favor, utiliza solo letras, espacios y los siguientes signos de puntuación (.,¿?!¡-_%&/), con un mínimo de 10 caracteres y máximo de 3000 caracteres"
                  }
                  color={isContentInvalid ? "danger" : undefined}
                  onChange={handlePostNewDataChange}
                />
                <span className="flex items-end gap-[1em]">
                  <Input
                    label="Tags"
                    variant="bordered"
                    defaultValue={formattedTags}
                    onChange={handlePostNewDataChange}
                    isInvalid={isTagsInvalid}
                    name="tags"
                    isRequired
                    labelPlacement="outside"
                    size="md"
                    errorMessage={
                      isTagsInvalid &&
                      "Por favor, asegúrate de que cada tag comience con #, seguido únicamente por letras, números y guiones bajos. Recuerda que cada tag debe estar separado por un espacio o salto de línea."
                    }
                    color={isTagsInvalid ? "danger" : undefined}
                  />
                  <Tooltip content={<TagTooltip />}>
                    <span className="w-[1.9em] h-[1.7em] mb-[.45em] bg-secondary-blurred rounded-full flex items-center justify-center">
                      <QuestionMark />
                    </span>
                  </Tooltip>
                </span>
              </ModalBody>
            </ModalBody>
            <ModalFooter className="pt-[1em] flex flex-col gap-[2em]">
              {serverErrors && (
                <p className="text-danger text-[.85em]">{serverErrors}</p>
              )}
              <div className="flex gap-[1em] justify-end">
                <Button
                  color="danger"
                  isDisabled={isLoading ? true : false}
                  variant="flat"
                  onPress={onOpenChange}
                >
                  Cancelar
                </Button>
                <Button
                  isLoading={isLoading ? true : false}
                  color="primary"
                  onPress={handleEditPost}
                  isDisabled={
                    isTitleInvalid || isContentInvalid || isTagsInvalid
                      ? true
                      : false
                  }
                >
                  Crear
                </Button>
              </div>
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
