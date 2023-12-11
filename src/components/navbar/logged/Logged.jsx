import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { User } from "@nextui-org/user";
import { Link } from "react-router-dom";
import { Popups, usePopups } from "../../../hooks/usePopups";
import { useAuth } from "../../../hooks/useAuth";
import { userInitials } from "../../../services/helpers";

export function Logged() {
  const { userData } = useAuth();
  const { togglePopup } = usePopups();

  return (
    <Dropdown>
      <DropdownTrigger>
        <User
          name={`${userData.name} ${userData.surname}`}
          description={
            <Link className="text-primary">@{userData.username}</Link>
          }
          avatarProps={{
            src: userData.avatar || undefined,
            name: userInitials(userData.name, userData.surname),
            isBordered: true,
          }}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="profile" color="default">
          <Link to="/profile" className="w-full block">
            Perfil
          </Link>
        </DropdownItem>
        <DropdownItem key="copy">Copy link</DropdownItem>
        <DropdownItem key="edit">Edit file</DropdownItem>
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
  );
}
