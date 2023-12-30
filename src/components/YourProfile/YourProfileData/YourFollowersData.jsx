import PropTypes from "prop-types";
import { usePopups, Popups } from "../../../hooks/usePopups";

export function YourFollowersData({ followers }) {
  const { togglePopup } = usePopups();

  return (
    <span
      className={`flex gap-[5px] cursor-pointer`}
      onClick={() => togglePopup(Popups.Followers)}
    >
      <p>{!followers ? 0 : followers.length}</p>
      <p className="font-bold mr-[1em]">Seguidores</p>
    </span>
  );
}

YourFollowersData.propTypes = {
  followers: PropTypes.array,
  pathUsername: PropTypes.string,
};
