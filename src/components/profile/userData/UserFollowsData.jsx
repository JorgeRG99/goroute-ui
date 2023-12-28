import PropTypes from "prop-types";
import { Popups, usePopups } from "../../../hooks/usePopups";

export function UserFollowsData({ follows, pathUsername }) {
  const { togglePopup } = usePopups();

  return (
    <span
      className={`flex gap-[5px] ${!pathUsername && "cursor-pointer"}`}
      onClick={!pathUsername ? () => togglePopup(Popups.Follows) : undefined}
    >
      <p>{!follows ? 0 : follows.length}</p>
      <p className="font-bold mr-[1em]">Seguidos</p>
    </span>
  );
}

UserFollowsData.propTypes = {
  follows: PropTypes.array,
  pathUsername: PropTypes.string,
};
