import PropTypes from "prop-types";

export function UserActivitiesData({ userActivities }) {
  return (
    <>
      <p>{!userActivities ? 0 : userActivities.length}</p>
      <p className="font-bold mr-[1em]">Actividades</p>
    </>
  );
}
UserActivitiesData.propTypes = {
  userActivities: PropTypes.array,
};
