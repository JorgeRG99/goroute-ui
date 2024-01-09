import { GoRouteLogo } from "../../icons/GoRouteLogo";
import { Link } from "react-router-dom";
import { LoggedMenu } from "../logged/LoggedMenu";
import { APP_NAME } from "../../../../config";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import { LoggedTabs } from "./LoggedTabs";

export default function LoggedNavbar() {
  return (
    <>
      <Navbar
        className="w-auto py-[2em] h-[100vh]"
        classNames={{
          wrapper: "flex-col pl-[1.8em] pr-[0] items-start h-full",
          brand: "flex-grow-0",
        }}
      >
        <NavbarBrand>
          <Link className="flex items-center" to="/">
            <GoRouteLogo />
            <p className="hidden xl:block">{APP_NAME}</p>
          </Link>
        </NavbarBrand>
        <NavbarContent
          className="hidden sm:flex gap-4 h-[70%] flex-col items-start py-[4em]"
          justify="start"
        >
          <LoggedTabs />
        </NavbarContent>
        <NavbarContent justify="none" className="grow-0 h-[10%]">
          <LoggedMenu />
        </NavbarContent>
      </Navbar>
    </>
  );
}
