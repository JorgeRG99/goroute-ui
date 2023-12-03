import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import PropTypes from "prop-types";
import { User } from "@nextui-org/user";
import { Link } from "react-router-dom";
import { Popups, usePopups } from "../../hooks/usePopups";

export function Logged({ userData }) {
  const initials = `${userData.name[0]}${userData.surname[0]}`.toUpperCase();
  const { togglePopup } = usePopups();

  return (
    <Dropdown>
      <DropdownTrigger>
        <User
          name={`${userData.name} ${userData.surname}`}
          description={
            <Link className="text-[#17aa5a]">@{userData.username}</Link>
          }
          avatarProps={{
            src: userData.avatar || undefined,
            name: initials,
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

Logged.propTypes = {
  userData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }).isRequired,
};
