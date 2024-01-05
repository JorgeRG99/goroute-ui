import { LIKE_SMALL_SIZE } from "../../../config";
import { formatActivityDate } from "../../services/helpers";
import { Like } from "../Icons/Like";
import { useUserSessionStore } from "../../store/userSession";
import { useDisclosure } from "@nextui-org/modal";
import { Suspense, lazy } from "react";
import PropTypes from "prop-types";
import { OpenDeleteCommentPopup } from "../Buttons/OpenDeleteCommentPopup";
import { createPortal } from "react-dom";
import { useCommentLikes } from "../../hooks/useCommentLikes";
import Unlike from "../icons/Unlike";
import { Divider } from "@nextui-org/react";

const DeleteCommentPopup = lazy(() =>
  import("../Popups/Comment/DeleteCommentPopup")
);

export function CommentCard({ comment, setPostComments, setCommentsNumber }) {
  const { id, user, created_at, content } = comment;
  const userData = useUserSessionStore((state) => state.userData);
  const { commentLikesList, isLiked, handleLikeStatus } =
    useCommentLikes(comment);

  const {
    isOpen: isOpenDeleteCommentPopup,
    onOpen: onOpenDeleteCommentPopup,
    onOpenChange: onOpenChangeDeleteCommentPopup,
  } = useDisclosure();

  return (
    <>
      {isOpenDeleteCommentPopup && (
        <Suspense>
          {createPortal(
            <DeleteCommentPopup
              isOpen={isOpenDeleteCommentPopup}
              onOpenChange={onOpenChangeDeleteCommentPopup}
              commentId={id}
              setPostComments={setPostComments}
              setCommentsNumber={setCommentsNumber}
            />,
            document.body
          )}
        </Suspense>
      )}
      <div className="px-[.8em] pt-[.5em] pb-[.8em] bg-success-light w-[90%] rounded-b-md rounded-tr-md flex flex-col gap-[1em]">
        <div className="flex justify-between">
          <span>
            <h3 className="text-[.8em] font-semibold">{`${user.name} ${user.surname}`}</h3>
            <h4 className="text-[.8em] text-primary">@{user.username}</h4>
          </span>
          <p className="text-[.7em]">
            {formatActivityDate(created_at.slice(0, 10))}
          </p>
        </div>
        <ul className="flex flex-col gap-[.6em]">
          {content.map((paragraph) => (
            <li key={crypto.randomUUID()} className="text-[.9em]">
              <p>{paragraph}</p>
            </li>
          ))}
        </ul>
        <Divider />
        <div className="flex justify-between items-end">
          <span className="flex gap-[.2em] items-center text-[.75em] text-secondary">
            {commentLikesList.length} Me gusta
          </span>
          <span className="flex gap-[.2em] items-center text-[.75em]">
            <span onClick={handleLikeStatus}>
              {isLiked ? (
                <Unlike size={LIKE_SMALL_SIZE} />
              ) : (
                <Like color="black" size={LIKE_SMALL_SIZE} />
              )}
            </span>
            {userData.id === user.id && (
              <OpenDeleteCommentPopup onOpen={onOpenDeleteCommentPopup} />
            )}
          </span>
        </div>
      </div>
    </>
  );
}

CommentCard.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      surname: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
    created_at: PropTypes.string.isRequired,
    content: PropTypes.arrayOf(PropTypes.string).isRequired,
    likes: PropTypes.array.isRequired,
  }).isRequired,
  setPostComments: PropTypes.func.isRequired,
  setCommentsNumber: PropTypes.func.isRequired,
};
