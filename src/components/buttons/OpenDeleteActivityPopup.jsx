import { Button } from "@nextui-org/react";
import { Delete } from "../Icons/Delete";
import PropTypes from "prop-types";

export default function OpenDeleteActivityPopup({ onOpen }) {
  return (
    <Button
      color="danger"
      variant="shadow"
      size="sm"
      isIconOnly
      onPress={onOpen}
    >
      <Delete />
    </Button>
  );
}

OpenDeleteActivityPopup.propTypes = {
  onOpen: PropTypes.func.isRequired,
};
