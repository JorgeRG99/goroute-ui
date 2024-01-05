import { Button } from "@nextui-org/react";
import { Delete } from "../Icons/Delete";
import PropTypes from "prop-types";

export default function OpenDeletePostPopup({ onOpen }) {
  return (
    <Button
      color="danger"
      variant="shadow"
      size="sm"
      isIconOnly
      onPress={onOpen}
    >
      <Delete color="white" />
    </Button>
  );
}

OpenDeletePostPopup.propTypes = {
  onOpen: PropTypes.func.isRequired,
};
