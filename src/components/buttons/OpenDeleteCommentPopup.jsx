import { Button } from "@nextui-org/react";
import { Delete } from "../Icons/Delete";
import PropTypes from "prop-types";
import { DEFAULT_COLOR } from "../../../config";

export function OpenDeleteCommentPopup({ onOpen }) {
  return (
    <Button
      className="h-[1.5em]"
      aria-label="Eliminar comentario"
      color="transparent"
      size="sm"
      isIconOnly
      onPress={onOpen}
    >
      <Delete color={DEFAULT_COLOR} />
    </Button>
  );
}

OpenDeleteCommentPopup.propTypes = {
  onOpen: PropTypes.func.isRequired,
};
