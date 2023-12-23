import PropTypes from "prop-types";
import { CreateActivity } from "../buttons/CreateActivity";

export function NoPublications({ type, isCurrentUserProfile, username }) {
  return (
    <>
      {isCurrentUserProfile ? (
        <span className="w-[90%] flex flex-col items-center gap-[1em] pt-[4em]">
          <h2>Aún no tienes {type}</h2>
          <CreateActivity />
        </span>
      ) : (
        <h2 className="m-auto mt-[4em]">
          <span className="text-primary">@{username}</span> aun no ha publicado
          ninguna actividad
        </h2>
      )}
    </>
  );
}

NoPublications.propTypes = {
  type: PropTypes.string.isRequired,
  isCurrentUserProfile: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
};
