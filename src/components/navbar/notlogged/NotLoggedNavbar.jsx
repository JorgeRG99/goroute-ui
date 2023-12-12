import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { GoRouteLogo } from "../../icons/GoRouteLogo";
import { Link as RouteLink } from "react-router-dom";
import { NotLogged } from "./NotLogged";
import { usePopups } from "../../../hooks/usePopups";
import { APP_NAME } from "../../../../config";

export const NotLoggedNavbar = () => {
  const { togglePopup } = usePopups();

  return (
    <Navbar classNames={{ wrapper: "sm:max-w-[92%] max-w-full" }}>
      <NavbarBrand className="h-full">
        <RouteLink to="/">
          <GoRouteLogo />
        </RouteLink>
        <p className=" text-inherit">{APP_NAME}</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <RouteLink
            color="foreground"
            /* to={userData.authToken ? "/" : togglePopup(Popups.Login)} */
          >
            Publicaciones
          </RouteLink>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Actividades
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Mapa
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NotLogged togglePopup={togglePopup} />
      </NavbarContent>
    </Navbar>
  );
};
