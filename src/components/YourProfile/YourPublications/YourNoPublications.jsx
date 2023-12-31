import PropTypes from "prop-types";
import { OpenCreateActivityPopup } from "../../Buttons/OpenCreateActivityPopup";
import { OpenCreatePostPopup } from "../../Buttons/OpenCreatePostPopup";

export default function YourNoPublications({ type }) {
  return (
    <span className="w-[90%] flex flex-col items-center gap-[1em] pt-[4em]">
      <h2>Aún no tienes {type}</h2>
      {type === "actividades" ? (
        <OpenCreateActivityPopup />
      ) : (
        <OpenCreatePostPopup />
      )}
    </span>
  );
}

YourNoPublications.propTypes = {
  type: PropTypes.string.isRequired,
};
