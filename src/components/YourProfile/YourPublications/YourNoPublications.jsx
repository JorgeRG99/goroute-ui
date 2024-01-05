import PropTypes from "prop-types";
import { lazy, Suspense } from "react";

const OpenCreateActivityPopup = lazy(() =>
  import("../../Buttons/OpenCreateActivityPopup")
);
const OpenCreatePostPopup = lazy(() =>
  import("../../Buttons/OpenCreatePostPopup")
);

export default function YourNoPublications({ type }) {
  return (
    <span className="w-[90%] flex flex-col items-center gap-[1em] pt-[4em]">
      <h2>Aún no tienes {type}</h2>
      {type === "actividades" ? (
        <Suspense>
          <OpenCreateActivityPopup />
        </Suspense>
      ) : (
        <Suspense>
          <OpenCreatePostPopup />
        </Suspense>
      )}
    </span>
  );
}

YourNoPublications.propTypes = {
  type: PropTypes.string.isRequired,
};
