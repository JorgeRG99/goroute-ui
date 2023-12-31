import {
  Textarea,
  Input,
  ModalFooter,
  Button,
  ModalBody,
  Tooltip,
} from "@nextui-org/react";
import { useRef, useState } from "react";
import { useUserPostsStore } from "../../../store/userPosts";
import { QuestionMark } from "../../Icons/QuestionMark";
import { TagTooltip } from "../../Tooltips/TagTooltip";
import PropTypes from "prop-types";

export function CreatePostForm({ onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const addPost = useUserPostsStore((state) => state.addPost);

  const userInputData = {
    titleRef: useRef(),
    contentRef: useRef(),
    tagsRef: useRef(),
  };

  const handleAddPost = async () => {
    setIsLoading(true);

    const title = userInputData.titleRef.current;
    const content = userInputData.contentRef.current
      .split("\n")
      .filter((paragraph) => paragraph);
    const tags = userInputData.tagsRef.current.split("#").filter((tag) => tag);

    await addPost({
      title,
      content,
      tags,
    });

    onClose();
  };

  return (
    <>
      <ModalBody>
        <Input
          label="Título"
          placeholder="Entrenamiento de Alta Intensidad (HIIT) para..."
          variant="bordered"
          onValueChange={(value) => {
            userInputData.titleRef.current = value;
          }}
        />
        <Textarea
          size="md"
          label="Descripción"
          variant="bordered"
          placeholder="Comparte tus rutinas, consejos o experiencias deportivas aquí..."
          onValueChange={(value) => {
            userInputData.contentRef.current = value;
          }}
        />
        <span className="flex items-center gap-[1em]">
          <Input
            label="Tags"
            variant="bordered"
            placeholder="#fitness#running#musculación..."
            onValueChange={(value) => {
              userInputData.tagsRef.current = value;
            }}
          />
          <Tooltip content={<TagTooltip />}>
            <span className="w-[1.9em] h-[1.7em] bg-secondary-blurred rounded-full flex items-center justify-center">
              <QuestionMark />
            </span>
          </Tooltip>
        </span>
      </ModalBody>
      <ModalFooter>
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
        >
          Crear
        </Button>
      </ModalFooter>
    </>
  );
}
CreatePostForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};
