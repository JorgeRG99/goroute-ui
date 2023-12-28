import PropTypes from "prop-types";
import { usePopups, Popups } from "../../../hooks/usePopups";

export function UserFollowersData({ followers, pathUsername }) {
  const { togglePopup } = usePopups();

  return (
    <span
      className={`flex gap-[5px] ${!pathUsername && "cursor-pointer"}`}
      onClick={!pathUsername ? () => togglePopup(Popups.Followers) : undefined}
    >
      <p>{!followers ? 0 : followers.length}</p>
      <p className="font-bold mr-[1em]">Seguidores</p>
    </span>
  );
}

UserFollowersData.propTypes = {
  followers: PropTypes.array,
  pathUsername: PropTypes.string,
};
