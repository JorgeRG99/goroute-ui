import PropTypes from "prop-types";
import { Button } from "@nextui-org/button";
import { Popups, usePopups } from "../../hooks/usePopups";

export function NoPublications({ type }) {
  const { togglePopup } = usePopups();

  return (
    <span className="w-[90%] flex flex-col items-center gap-[1em] pt-[4em]">
      <h2>Aún no tienes {type}</h2>
      <Button
        size="sm"
        onPress={() => togglePopup(Popups.AddActivity)}
        variant="shadow"
        color="primary"
      >
        Crear
      </Button>
    </span>
  );
}

NoPublications.propTypes = {
  type: PropTypes.string.isRequired,
};
