import { Button } from "@nextui-org/react";
import { Popups, usePopups } from "../../hooks/usePopups";

export default function OpenCreatePostPopup() {
  const { togglePopup } = usePopups();

  return (
    <Button
      size="sm"
      onPress={() => togglePopup(Popups.AddPost)}
      variant="shadow"
      color="primary"
    >
      Crear
    </Button>
  );
}
