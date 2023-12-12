import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { Popups, usePopups } from "../../../hooks/usePopups";
import Settings from "../../icons/Settings";

export function LoggedMenu() {
  const { togglePopup } = usePopups();

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <button className="focus:outline-none">
            <Settings />
          </button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem
            key="logout"
            onPress={() => togglePopup(Popups.Logout)}
            className="text-danger"
            color="danger"
          >
            Cerrar Sesión
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
}
