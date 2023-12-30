import PropTypes from "prop-types";
import { Popups, usePopups } from "../../../hooks/usePopups";

export function YourFollowsData({ follows }) {
  const { togglePopup } = usePopups();

  return (
    <span
      className={`flex gap-[5px] cursor-pointer`}
      onClick={() => togglePopup(Popups.Follows)}
    >
      <p>{!follows ? 0 : follows.length}</p>
      <p className="font-bold mr-[1em]">Seguidos</p>
    </span>
  );
}

YourFollowsData.propTypes = {
  follows: PropTypes.array,
  pathUsername: PropTypes.string,
};
