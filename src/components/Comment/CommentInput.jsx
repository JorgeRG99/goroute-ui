import { Avatar, Button, Textarea } from "@nextui-org/react";
import { useUserSessionStore } from "../../store/userSession";
import { userInitials } from "../../services/helpers";
import { Send } from "../Icons/Send";
import { useRef } from "react";
import { useComments } from "../../hooks/useComments";
import PropTypes from "prop-types";

export function CommentInput({ postId }) {
  const { addComment } = useComments();
  const userData = useUserSessionStore((state) => state.userData);
  const commentRef = useRef();

  const handleCommentChange = (e) => {
    commentRef.current = e.target.value;
  };

  const handleCommentSubmit = async () => {
    const content = commentRef.current
      .split("\n")
      .filter((paragraph) => paragraph);

    await addComment({
      post_id: postId,
      content,
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
        placeholder="¿Qué te parece este post? Deja un comentario..."
        onChange={handleCommentChange}
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
};
