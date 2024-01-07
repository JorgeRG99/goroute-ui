import {
  Textarea,
  Input,
  ModalFooter,
  Button,
  ModalBody,
  Tooltip,
} from "@nextui-org/react";
import { useState } from "react";
import { useUserPostsStore } from "../../../store/userPosts";
import { QuestionMark } from "../../Icons/QuestionMark";
import { TagTooltip } from "../../Tooltips/TagTooltip";
import PropTypes from "prop-types";
import { usePostDataValidator } from "../../../hooks/FormValidationsHooks/usePostDataValidator";

export function CreatePostForm({ onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const addPost = useUserPostsStore((state) => state.addPost);
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    tags: "",
  });

  const {
    isTitleInvalid,
    isContentInvalid,
    isTagsInvalid,
    serverErrors,
    catchEmptyValues,
    catchedServerErrors,
  } = usePostDataValidator(postData);

  const handleAddPost = async () => {
    setIsLoading(true);

    const title = postData.title;
    const content = postData.content
      .split("\n")
      .filter((paragraph) => paragraph);
    const tags = postData.tags.split("#").filter((tag) => tag);
    const catchedEmptyData = catchEmptyValues();

    if (!catchedEmptyData) {
      const response = await addPost({
        title,
        content,
        tags,
      });

      const errorOcurred = catchedServerErrors(response);

      if (!errorOcurred) onClose();
      setIsLoading(false);
    }

    setIsLoading(false);
  };

  const handlePostDataChange = (e) => {
    setPostData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <ModalBody>
        <Input
          label="Título"
          placeholder="Entrenamiento de Alta Intensidad (HIIT) para..."
          variant="bordered"
          name="title"
          autoComplete="title"
          isInvalid={isTitleInvalid}
          errorMessage={
            isTitleInvalid &&
            "Por favor, utiliza solo letras y espacios, con un mínimo de 10 caracteres y máximo de 30 caracteres"
          }
          color={isTitleInvalid ? "danger" : undefined}
          onChange={handlePostDataChange}
        />
        <Textarea
          size="md"
          label="Contenido"
          variant="bordered"
          name="content"
          placeholder="Comparte tus rutinas, consejos o experiencias deportivas aquí..."
          isInvalid={isContentInvalid}
          errorMessage={
            isContentInvalid &&
            "Por favor, utiliza solo letras y espacios, con un mínimo de 10 caracteres y máximo de 3000 caracteres"
          }
          color={isContentInvalid ? "danger" : undefined}
          onChange={handlePostDataChange}
        />
        <span className="flex items-center gap-[1em]">
          <Input
            label="Tags"
            variant="bordered"
            name="tags"
            placeholder="#fitness#running#musculación..."
            isInvalid={isTagsInvalid}
            errorMessage={
              isTagsInvalid &&
              "Por favor, asegúrate de que cada tag comience con #, seguido únicamente por letras, números y guiones bajos. Recuerda que cada tag debe estar separado por un espacio o salto de línea."
            }
            color={isTagsInvalid ? "danger" : undefined}
            onChange={handlePostDataChange}
          />
          <Tooltip content={<TagTooltip />}>
            <span className="w-[1.9em] h-[1.7em] bg-secondary-blurred rounded-full flex items-center justify-center">
              <QuestionMark />
            </span>
          </Tooltip>
        </span>
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
            onPress={onClose}
          >
            Cancelar
          </Button>
          <Button
            isLoading={isLoading ? true : false}
            color="primary"
            onPress={handleAddPost}
            isDisabled={
              isTitleInvalid || isContentInvalid || isTagsInvalid ? true : false
            }
          >
            Crear
          </Button>
        </div>
      </ModalFooter>
    </>
  );
}
CreatePostForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};
