import PropTypes from "prop-types";
import { Popups, usePopups } from "../../../hooks/usePopups";

export function UserFollowsData({ follows, isCurrentUserProfile }) {
  const { togglePopup } = usePopups();

  return (
    <span
      className={`flex gap-[5px] ${isCurrentUserProfile && "cursor-pointer"}`}
      onClick={
        isCurrentUserProfile ? () => togglePopup(Popups.Follows) : undefined
      }
    >
      <p>{!follows ? 0 : follows.length}</p>
      <p className="font-bold mr-[1em]">Seguidos</p>
    </span>
  );
}

UserFollowsData.propTypes = {
  follows: PropTypes.array,
  isCurrentUserProfile: PropTypes.bool.isRequired,
};
