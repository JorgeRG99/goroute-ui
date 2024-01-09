import { Avatar, Button, Textarea } from "@nextui-org/react";
import { useUserSessionStore } from "../../store/userSession";
import { userInitials } from "../../services/helpers";
import { Send } from "../Icons/Send";
import { useComments } from "../../hooks/useComments";
import PropTypes from "prop-types";
import { useCommentValidator } from "../../hooks/FormValidationsHooks/useCommentValidator";
import { useState } from "react";

export function CommentInput({ postId, setPostComments }) {
  const { addComment, getLastComment } = useComments();
  const userData = useUserSessionStore((state) => state.userData);
  const [comment, setComment] = useState("");
  const {
    isCommentInvalid,
    serverErrors,
    catchEmptyValues,
    catchedServerErrors,
  } = useCommentValidator(comment);

  const handleCommentSubmit = async () => {
    const catchedEmptyData = catchEmptyValues();

    if (!catchedEmptyData) {
      const content = comment.split("\n").filter((paragraph) => paragraph);

      const newCommentData = {
        post_id: postId,
        content,
      };

      const response = await addComment(newCommentData);

      const errorOcurred = catchedServerErrors(response);

      if (!errorOcurred) {
        const newComment = await getLastComment(postId);

        setPostComments((prevState) => {
          const updatedCommentsList = [...prevState];

          updatedCommentsList.unshift(newComment);

          return updatedCommentsList;
        });
      }
    }
  };

  const handleCommentChange = (e) => setComment(e.target.value);

  return (
    <>
      <div className="w-full pt-[1em] flex items-start justify-between px-4">
        <Avatar
          src={userData.avatar || undefined}
          size="md"
          name={userInitials(userData.name, userData.surname)}
          isBordered
        />
        <Textarea
          minRows={1}
          className="w-[90%]"
          variant="underlined"
          classNames={{ innerWrapper: "items-end" }}
          size="sm"
          name="comment"
          isInvalid={isCommentInvalid}
          errorMessage={
            isCommentInvalid &&
            "Por favor, utiliza solo letras, espacios y los siguientes signos de puntuación (.,¿?!¡-_%&), con un mínimo de 10 caracteres y máximo de 150 caracteres"
          }
          onChange={handleCommentChange}
          placeholder="¿Qué te parece este post? Deja un comentario..."
          endContent={
            <Button
              isIconOnly
              radius="full"
              className="flex items-center bg-transparent hover:bg-black hover:bg-opacity-[0.1]"
              size="sm"
              isDisabled={isCommentInvalid ? true : false}
              onPress={handleCommentSubmit}
            >
              <Send />
            </Button>
          }
        />
      </div>
      {serverErrors && (
        <p className="text-danger text-[.85em] mt-[2em] w-[80%]">
          {serverErrors}
        </p>
      )}
    </>
  );
}

CommentInput.propTypes = {
  postId: PropTypes.string.isRequired,
  setPostComments: PropTypes.func.isRequired,
};
