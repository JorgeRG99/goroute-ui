import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { GoRouteLogo } from "../icons/GoRouteLogo";
import { Link } from "@nextui-org/link";
import { Link as RouteLink } from "react-router-dom";
import { Logged } from "./Logged";
import { NotLogged } from "./NotLogged";
import { UserContext } from "../../context/user";
import { useContext } from "react";

export const WebNavbar = () => {
  const { userData } = useContext(UserContext);

  return (
    <Navbar classNames={{ wrapper: "sm:max-w-[92%] max-w-full" }}>
      <NavbarBrand className="h-full">
        <RouteLink to="/">
          <GoRouteLogo />
        </RouteLink>
        <p className=" text-inherit">GOROUTE</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Publicaciones
          </Link>
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
        {userData.id ? <Logged userData={userData} /> : <NotLogged />}
      </NavbarContent>
    </Navbar>
  );
};
