import { Button } from "@nextui-org/react";
import { Delete } from "../Icons/Delete";
import PropTypes from "prop-types";

export default function DeleteActivity({ onOpen }) {
  return (
    <Button color="danger" size="sm" isIconOnly onPress={onOpen}>
      <Delete />
    </Button>
  );
}

DeleteActivity.propTypes = {
  onOpen: PropTypes.func.isRequired,
};
