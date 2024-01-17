import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Suspense, lazy, useState } from "react";
import { Link } from "react-router-dom";
import { Unfold } from "../Buttons/Unfold";
import { Comment } from "../Icons/Comment";
import { Like } from "../Icons/Like";
import {
  LIKE_MEDIUM_SIZE,
  TERTIARY_COLOR,
  USER_CARD_BIG_SIZE,
} from "../../../config";
import { formatActivityDate } from "../../services/helpers";
import { usePostLikes } from "../../hooks/usePostLikes";
import { Unlike } from "../icons/Unlike";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import UserCard from "./UserCard";

const ToggleFollowButton = lazy(() => import("../buttons/ToggleFollowButton"));
const EditPostPopup = lazy(() => import("../Popups/Post/EditPostPopup"));
const DeletePostPopup = lazy(() => import("../Popups/Post/DeletePostPopup"));
const OpenEditPostPopup = lazy(() => import("../Buttons/OpenEditPostPopup"));
const OpenDeletePostPopup = lazy(() =>
  import("../Buttons/OpenDeletePostPopup")
);
const Comments = lazy(() => import("../Comment/Comments"));

export default function PostCard({
  postData,
  isForProfile,
  isCurrentUserProfile,
}) {
  const [isUnfolded, setIsUnfolded] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const {
    id,
    title,
    content,
    tags,
    user,
    comments_number,
    created_at,
    comments,
  } = postData;

  const { postLikesList, isLiked, handleLikeStatus } = usePostLikes(postData);
  const creationDate = formatActivityDate(created_at.slice(0, 10));
  const [commentsNumber, setCommentsNumber] = useState(comments_number);
  const cardWidth = isForProfile ? "full" : "80%";

  const {
    isOpen: isOpenEditPostPopup,
    onOpen: onOpenEditPostPopup,
    onOpenChange: onOpenChangeEditPostPopup,
  } = useDisclosure();

  const {
    isOpen: isOpenDeletePostPopup,
    onOpen: onOpenDeletePostPopup,
    onOpenChange: onOpenChangeDeletePostPopup,
  } = useDisclosure();

  const toggleShowComments = () => setShowComments(!showComments);

  return (
    <>
      {isOpenEditPostPopup && (
        <Suspense>
          {createPortal(
            <EditPostPopup
              isOpen={isOpenEditPostPopup}
              onOpenChange={onOpenChangeEditPostPopup}
              postData={postData}
            />,
            document.body
          )}
        </Suspense>
      )}
      {isOpenDeletePostPopup && (
        <Suspense>
          {createPortal(
            <DeletePostPopup
              isOpen={isOpenDeletePostPopup}
              onOpenChange={onOpenChangeDeletePostPopup}
              postId={postData.id}
            />,
            document.body
          )}
        </Suspense>
      )}
      {user && (
        <Card
          isBlurred
          className={`border-none bg-background/60 dark:bg-default-100/50 w-[${cardWidth}]`}
          shadow="sm"
        >
          <CardHeader className="p-[1.5em] w-full flex justify-between items-start">
            <div className="flex gap-[1.5em] items-center">
              <UserCard size={USER_CARD_BIG_SIZE} user={user} />
              {!isCurrentUserProfile && (
                <Suspense>
                  <ToggleFollowButton id={user.id} />
                </Suspense>
              )}
            </div>
            <p className="text-[.9em] font-light">
              Publicado el {creationDate}
            </p>
            {isCurrentUserProfile && (
              <Suspense>
                <span className="flex items-center gap-[1em]">
                  <OpenEditPostPopup onOpen={onOpenEditPostPopup} />
                  <OpenDeletePostPopup onOpen={onOpenDeletePostPopup} />
                </span>
              </Suspense>
            )}
          </CardHeader>
          <CardBody
            className={`px-9 pt-0 flex gap-[2em] ${
              !isUnfolded && "h-[6.5em]"
            } overflow-hidden`}
          >
            <h2 className="font-semibold text-[1.2em]">{title}</h2>
            {content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            <span>
              {tags.map((tag, index) => (
                <Link key={index} className="text-success hover:underline">
                  #{tag}
                </Link>
              ))}
            </span>
          </CardBody>
          <CardFooter className="flex flex-col py-4 overflow-visible">
            <div className="flex items-center justify-between w-full px-7 pb-4">
              <span className="flex gap-[.8em]">
                <span
                  onClick={handleLikeStatus}
                  className="cursor-pointer flex items-center gap-[.5em]"
                >
                  {isLiked ? (
                    <Unlike size={LIKE_MEDIUM_SIZE} />
                  ) : (
                    <Like color={TERTIARY_COLOR} size={LIKE_MEDIUM_SIZE} />
                  )}
                  <strong className="font-normal text-black">
                    {postLikesList.length}
                  </strong>
                </span>
                <span
                  onClick={toggleShowComments}
                  className="cursor-pointer flex flex items-center gap-[.5em]"
                >
                  <Comment />
                  <strong className="font-normal text-black">
                    {commentsNumber}
                  </strong>
                </span>
              </span>
              <Unfold isUnfolded={isUnfolded} setIsUnfolded={setIsUnfolded} />
            </div>
            {showComments && (
              <Suspense>
                <Comments
                  postId={id}
                  comments={comments}
                  setCommentsNumber={setCommentsNumber}
                />
              </Suspense>
            )}
          </CardFooter>
        </Card>
      )}
    </>
  );
}

PostCard.propTypes = {
  postData: PropTypes.object.isRequired,
  isCurrentUserProfile: PropTypes.bool,
  isForProfile: PropTypes.bool,
};
