import { Button } from "@nextui-org/react";
import PropTypes from "prop-types";
import { Edit } from "../Icons/Edit";

export default function OpenEditActivityPopup({ onOpen }) {
  return (
    <Button
      onPress={onOpen}
      className="text-tiny"
      color="primary"
      variant="shadow"
      size="sm"
      isIconOnly
    >
      <Edit />
    </Button>
  );
}

OpenEditActivityPopup.propTypes = {
  onOpen: PropTypes.func.isRequired,
};
