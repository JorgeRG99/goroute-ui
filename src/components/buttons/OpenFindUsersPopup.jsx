import { Button } from "@nextui-org/react";
import { usePopups, Popups } from "../../hooks/usePopups";
import { SearchNavbar } from "../Icons/SearchNavbar";

export function OpenFindUsersPopup() {
  const { togglePopup } = usePopups();
  return (
    <Button
      size="md"
      onPress={() => {
        togglePopup(Popups.FindUser);
        togglePopup(Popups.Follows);
      }}
      variant="shadow"
      color="primary"
      isIconOnly
    >
      <SearchNavbar color="white" />
    </Button>
  );
}

export default OpenFindUsersPopup;
