import PropTypes from "prop-types";

export function UserFollowsData({ follows }) {
  return (
    <>
      <p>{!follows ? 0 : JSON.parse(follows).length}</p>
      <p className="font-bold mr-[1em]">Seguidos</p>
    </>
  );
}

UserFollowsData.propTypes = {
  follows: PropTypes.array,
};
