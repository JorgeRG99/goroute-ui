import PropTypes from "prop-types";
import { Avatar } from "@nextui-org/react";
import { userInitials } from "../../services/helpers";
import { CommentCard } from "../Cards/CommentCard";

export function CommentsContainer({
  comments,
  setPostComments,
  setCommentsNumber,
}) {
  return (
    <ul className="px-3 py-6 flex flex-col gap-[1em] w-[95%]">
      {comments?.map((comment) => (
        <li key={comment.id} className="w-full flex gap-[1em]">
          <Avatar
            src={comment.user.avatar || undefined}
            size="sm"
            name={userInitials(comment.user.name, comment.user.surname)}
            isBordered
          />
          <CommentCard
            comment={comment}
            setPostComments={setPostComments}
            setCommentsNumber={setCommentsNumber}
          />
        </li>
      ))}
    </ul>
  );
}

CommentsContainer.propTypes = {
  comments: PropTypes.array.isRequired,
  setPostComments: PropTypes.func.isRequired,
  setCommentsNumber: PropTypes.func.isRequired,
};
