import { Button } from "@nextui-org/react";
import { Popups, usePopups } from "../../hooks/usePopups";

export function OpenCreateActivityPopup() {
  const { togglePopup } = usePopups();

  return (
    <Button
      size="sm"
      onPress={() => togglePopup(Popups.AddActivity)}
      variant="shadow"
      color="primary"
    >
      Crear
    </Button>
  );
}
