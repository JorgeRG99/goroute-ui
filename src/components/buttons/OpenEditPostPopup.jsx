import { Button } from "@nextui-org/react";
import PropTypes from "prop-types";
import { Edit } from "../Icons/Edit";

export default function OpenEditPostPopup({ onOpen }) {
  return (
    <Button
      onPress={onOpen}
      color="success"
      isIconOnly
      variant="shadow"
      size="sm"
    >
      <Edit />
    </Button>
  );
}

OpenEditPostPopup.propTypes = {
  onOpen: PropTypes.func.isRequired,
};
