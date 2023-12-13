import PropTypes from "prop-types";

export function UserFollowersData({ followers }) {
  return (
    <>
      <p>{!followers ? 0 : JSON.parse(followers).length}</p>
      <p className="font-bold mr-[1em]">Seguidores</p>
    </>
  );
}

UserFollowersData.propTypes = {
  followers: PropTypes.array,
};
