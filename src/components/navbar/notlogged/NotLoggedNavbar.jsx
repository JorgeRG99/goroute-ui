import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { GoRouteLogo } from "../../icons/GoRouteLogo";
import { NotLogged } from "./NotLogged";
import { Popups, usePopups } from "../../../hooks/usePopups";
import { APP_NAME } from "../../../../config";

export default function NotLoggedNavbar() {
  const { togglePopup } = usePopups();

  return (
    <Navbar classNames={{ wrapper: "sm:max-w-[92%] max-w-full" }}>
      <NavbarBrand className="h-full">
        <GoRouteLogo />
        <p className=" text-inherit">{APP_NAME}</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link
            onPress={() => togglePopup(Popups.Login)}
            color="foreground"
            href="#"
          >
            Publicaciones
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link
            href="#"
            onPress={() => togglePopup(Popups.Login)}
            aria-current="page"
          >
            Actividades
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            onPress={() => togglePopup(Popups.Login)}
            color="foreground"
            href="#"
          >
            Mapa
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NotLogged togglePopup={togglePopup} />
      </NavbarContent>
    </Navbar>
  );
}
