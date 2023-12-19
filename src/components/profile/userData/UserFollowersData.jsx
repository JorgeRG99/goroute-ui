import PropTypes from "prop-types";
import { usePopups, Popups } from "../../../hooks/usePopups";

export function UserFollowersData({ followers, isCurrentUserProfile }) {
  const { togglePopup } = usePopups();

  return (
    <span
      className={`flex gap-[5px] ${isCurrentUserProfile && "cursor-pointer"}`}
      onClick={
        isCurrentUserProfile ? () => togglePopup(Popups.Followers) : undefined
      }
    >
      <p>{!followers ? 0 : followers.length}</p>
      <p className="font-bold mr-[1em]">Seguidores</p>
    </span>
  );
}

UserFollowersData.propTypes = {
  followers: PropTypes.array,
  isCurrentUserProfile: PropTypes.bool.isRequired,
};
