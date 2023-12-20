import PropTypes from "prop-types";
import { CreateActivity } from "../buttons/CreateActivity";

export function NoPublications({ type }) {
  return (
    <span className="w-[90%] flex flex-col items-center gap-[1em] pt-[4em]">
      <h2>Aún no tienes {type}</h2>
      <CreateActivity />
    </span>
  );
}

NoPublications.propTypes = {
  type: PropTypes.string.isRequired,
};
