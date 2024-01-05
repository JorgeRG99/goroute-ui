import { Chip } from "@nextui-org/react";
import { Like } from "../../../Icons/Like";
import { Unlike } from "../../../icons/Unlike";
import { Location } from "../../../icons/Location";
import { formatActivityDuration } from "../../../../services/helpers";
import PropTypes from "prop-types";
import { LIKE_MEDIUM_SIZE } from "../../../../../config";

export function JoinActivityPopupHeader({
  duration,
  location,
  likes,
  isLiked,
  handleLikeStatus,
}) {
  const formattedDuration = formatActivityDuration(duration);

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
          {isLiked ? (
            <Unlike size={LIKE_MEDIUM_SIZE} />
          ) : (
            <Like color="white" size={LIKE_MEDIUM_SIZE} />
          )}
          <strong className="font-normal">{likes}</strong>
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
  duration: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  handleLikeStatus: PropTypes.func.isRequired,
};
