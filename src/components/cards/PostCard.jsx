import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  User,
  useDisclosure,
} from "@nextui-org/react";
import { Suspense, lazy, useState } from "react";
import { Link } from "react-router-dom";
import { Unfold } from "../Buttons/Unfold";
import { Comment } from "../Icons/Comment";
import { Like } from "../Icons/Like";
import { TERTIARY_COLOR } from "../../../config";
import PropTypes from "prop-types";
import { useUserById } from "../../hooks/useUserById";
import { userInitials } from "../../services/helpers";
import { usePostLikes } from "../../hooks/usePostLikes";
import { Unlike } from "../icons/Unlike";
import { createPortal } from "react-dom";

const ToggleFollowButton = lazy(() => import("../buttons/ToggleFollowButton"));
const EditPostPopup = lazy(() => import("../Popups/Post/EditPostPopup"));
const DeletePostPopup = lazy(() => import("../Popups/Post/DeletePostPopup"));
const OpenEditPostPopup = lazy(() => import("../Buttons/OpenEditPostPopup"));
const OpenDeletePostPopup = lazy(() =>
  import("../Buttons/OpenDeletePostPopup")
);

export default function PostCard({
  postData,
  isForProfile,
  isCurrentUserProfile,
}) {
  const [isUnfolded, setIsUnfolded] = useState(false);
  const { title, content, tags, user_id } = postData;
  const { profileData } = useUserById(user_id);
  const { postLikesList, isLiked, handleLikeStatus } = usePostLikes(postData);

  const cardWidth = isForProfile ? "full" : "80%";
  const avatarSize = isForProfile ? "md" : "lg";
  const nameTextSize = isForProfile ? ".95" : "1";
  const descriptionTextSize = isForProfile ? "text-[.8em]" : "text-[.8em]";

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

  return (
    <>
      {isOpenEditPostPopup && (
        <Suspense>
          createPortal(
          <EditPostPopup
            isOpen={isOpenEditPostPopup}
            onOpenChange={onOpenChangeEditPostPopup}
            postData={postData}
          />
          , document.body )
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
      {profileData && (
        <Card
          isBlurred
          className={`border-none bg-background/60 dark:bg-default-100/50 w-[${cardWidth}]`}
          shadow="sm"
        >
          <CardHeader className="p-[1.5em] w-full flex justify-between items-center">
            <div className="flex gap-[1.5em] items-center">
              <Link to={`/${profileData.username}`}>
                <User
                  classNames={{
                    name: "capitalize text-[" + nameTextSize + "em]",
                    description: descriptionTextSize,
                    base: "py-[.2em]",
                    wrapper: "ml-[.6em]",
                  }}
                  name={`${profileData.name} ${profileData.surname}`}
                  description={
                    <p className="text-primary text-[1.1em]">
                      @{profileData.username}
                    </p>
                  }
                  avatarProps={{
                    src: profileData.avatar || undefined,
                    name: userInitials(profileData.name, profileData.surname),
                    isBordered: true,
                    size: avatarSize,
                  }}
                />
              </Link>
              {!isCurrentUserProfile && (
                <Suspense>
                  <ToggleFollowButton id={profileData.id} />
                </Suspense>
              )}
            </div>
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
            className={`px-9 pt-0 flex gap-[2em] ${!isUnfolded && "h-[6.5em]"}`}
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
          <CardFooter className="flex items-center justify-between px-9 py-6">
            <span className="flex gap-[.8em]">
              <span
                onClick={handleLikeStatus}
                className="cursor-pointer flex items-center gap-[.5em] text-white"
              >
                {isLiked ? <Unlike /> : <Like color={TERTIARY_COLOR} />}
                <strong className="font-normal text-black">
                  {postLikesList.length}
                </strong>
              </span>
              <Comment />
            </span>
            <Unfold isUnfolded={isUnfolded} setIsUnfolded={setIsUnfolded} />
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
