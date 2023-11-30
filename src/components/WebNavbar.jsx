/* eslint-disable react/prop-types */
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { GoRouteLogo } from "./GoRouteLogo";
import { useAuth } from "../hooks/useAuth";
import { useUser } from "../hooks/useUser";
import { Avatar, AvatarIcon } from "@nextui-org/avatar";
import { usePopups } from "../hooks/usePopups";
/* import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/dropdown"; */

export const WebNavbar = () => {
  const { authToken } = useAuth();
  const { userData } = useUser();

  const { displayLoginPopup, displayRegisterPopup } = usePopups();

  console.log(userData);

  return (
    <Navbar classNames={{ wrapper: "sm:max-w-[92%] max-w-full" }}>
      <NavbarBrand className="h-full">
        <GoRouteLogo />
        <p className=" text-inherit">GOROUTE</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {authToken === null ? (
          <>
            <NavbarItem className="lg:flex">
              <Link onPress={displayLoginPopup} href="#">
                Login
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button
                onPress={displayRegisterPopup}
                as={Link}
                color="secondary"
                href="#"
                variant="flat"
              >
                Sign Up
              </Button>
            </NavbarItem>
          </>
        ) : userData.avatar ? (
          <Avatar src="imagen" />
        ) : (
          <Avatar
            icon={<AvatarIcon />}
            classNames={{
              base: "bg-[#17aa5a]",
              icon: "text-white",
            }}
          />
        )}
      </NavbarContent>
    </Navbar>
  );
};
