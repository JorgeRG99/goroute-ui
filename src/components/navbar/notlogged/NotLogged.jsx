import { NavbarItem } from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Popups } from "../../../hooks/usePopups";
import PropTypes from "prop-types";

export function NotLogged({ togglePopup }) {
  return (
    <>
      <NavbarItem className="lg:flex">
        <Link onPress={() => togglePopup(Popups.Login)} href="#">
          Accede
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Button
          onPress={() => {
            togglePopup(Popups.Register);
          }}
          as={Link}
          color="secondary"
          href="#"
          variant="flat"
        >
          Registrate
        </Button>
      </NavbarItem>
    </>
  );
}
NotLogged.propTypes = {
  togglePopup: PropTypes.func.isRequired,
};
