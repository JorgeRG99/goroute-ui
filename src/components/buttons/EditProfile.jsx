import { Button } from "@nextui-org/react";
import { Popups, usePopups } from "../../hooks/usePopups";

export function EditProfile() {
  const { togglePopup } = usePopups();

  return (
    <Button
      size="sm"
      onPress={() => togglePopup(Popups.Edit)}
      color="secondary"
      variant="flat"
    >
      Editar Perfil
    </Button>
  );
}
