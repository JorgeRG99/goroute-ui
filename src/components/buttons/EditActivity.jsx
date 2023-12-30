import { Button } from "@nextui-org/react";
import PropTypes from "prop-types";

export default function EditActivity({ onOpen }) {
  return (
    <Button
      onPress={onOpen}
      className="text-tiny"
      color="primary"
      variant="shadow"
      size="sm"
    >
      Editar
    </Button>
  );
}

EditActivity.propTypes = {
  onOpen: PropTypes.func.isRequired,
};
