import { Chip } from "@nextui-org/react";
import PropTypes from "prop-types";
import { Like } from "../../../icons/Like";
import { Unlike } from "../../../icons/Unlike";
import { Location } from "../../../icons/Location";
import { formatActivityDuration } from "../../../../services/helpers";
import {
  activityLikes,
  likeActivity,
  unlikeActivity,
} from "../../../../services/activity";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../context/user";

export function JoinActivityPopupHeader({ duration, location, activityId }) {
  const { userData } = useContext(UserContext);
  const formattedDuration = formatActivityDuration(duration);
  const [activityLikesList, setActivityLikes] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const getActivityLikes = async () => {
      const likes = await activityLikes(userData.authToken, activityId);

      setActivityLikes(likes);

      const likeCheck = activityLikesList.some(
        (user) => user.id === userData.id
      );

      setIsLiked(likeCheck);
    };

    getActivityLikes();
  }, [activityLikesList.length]);

  const handleLikeStatus = async () => {
    if (!isLiked) {
      await likeActivity(userData.authToken, activityId);

      const updatedLikesList = [...activityLikesList];
      updatedLikesList.push(userData);

      setActivityLikes(updatedLikesList);
    } else {
      await unlikeActivity(userData.authToken, activityId);

      const updatedLikesList = activityLikesList.filter(
        (user) => user.id !== userData.id
      );

      setActivityLikes(updatedLikesList);
    }
  };

  return (
    <>
      <Chip
        className="ml-4 capitalize"
        variant="solid"
        color="secondary"
        classNames={{ content: "flex gap-[.5em]" }}
      >
        <Location />
        {location}
      </Chip>
      <span className="flex justify-between py-2 px-4">
        <span
          onClick={handleLikeStatus}
          className="cursor-pointer flex items-center gap-[.5em] text-white"
        >
          {isLiked ? <Unlike /> : <Like />}
          <strong className="font-normal">{activityLikesList.length}</strong>
        </span>
        <Chip color="primary">
          <p className="text-white capitalize font-light text-[1em]">
            {formattedDuration}
          </p>
        </Chip>
      </span>
    </>
  );
}

JoinActivityPopupHeader.propTypes = {
  activityId: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
};
