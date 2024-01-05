import { Avatar, Button, Textarea } from "@nextui-org/react";
import { useUserSessionStore } from "../../store/userSession";
import { userInitials } from "../../services/helpers";
import { Send } from "../Icons/Send";
import { useRef } from "react";
import { useComments } from "../../hooks/useComments";
import PropTypes from "prop-types";

export function CommentInput({ postId, setPostComments }) {
  const { addComment, getLastComment } = useComments();
  const userData = useUserSessionStore((state) => state.userData);
  const commentRef = useRef();

  const handleCommentSubmit = async () => {
    const content = commentRef.current.value
      .split("\n")
      .filter((paragraph) => paragraph);

    const newCommentData = {
      post_id: postId,
      content,
    };

    await addComment(newCommentData);

    const newComment = await getLastComment(postId);

    setPostComments((prevState) => {
      const updatedCommentsList = [...prevState];

      updatedCommentsList.unshift(newComment);

      return updatedCommentsList;
    });
  };

  return (
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
        ref={commentRef}
        placeholder="¿Qué te parece este post? Deja un comentario..."
        endContent={
          <Button
            isIconOnly
            radius="full"
            className="flex items-center bg-transparent hover:bg-black hover:bg-opacity-[0.1]"
            size="sm"
            onPress={handleCommentSubmit}
          >
            <Send />
          </Button>
        }
      />
    </div>
  );
}

CommentInput.propTypes = {
  postId: PropTypes.string.isRequired,
  setPostComments: PropTypes.func.isRequired,
};
