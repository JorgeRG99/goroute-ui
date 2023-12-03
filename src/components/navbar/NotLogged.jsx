import { NavbarItem } from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Popups, usePopups } from "../../hooks/usePopups";

export function NotLogged() {
  const { togglePopup } = usePopups();

  return (
    <>
      <NavbarItem className="lg:flex">
        <Link onPress={() => togglePopup(Popups.Login)} href="#">
          Accede
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Button
          onPress={() => togglePopup(Popups.Register)}
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

export default NotLogged;
