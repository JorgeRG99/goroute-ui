import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/navbar";
import { Tab, Tabs } from "@nextui-org/tabs";
import { GoRouteLogo } from "../../icons/GoRouteLogo";
import { Map } from "../../icons/Map";
import { Create } from "../../icons/Create";
import { Runner } from "../../icons/Runner";
import { Posts } from "../../icons/Posts";
import { Link as RouteLink } from "react-router-dom";
import { Logged } from "../logged/Logged";
import { APP_NAME, DEFAULT_COLOR, PRIMARY_COLOR } from "../../../../config";
import { Chat } from "../../icons/Chat";
import { Notifications } from "../../icons/Notifications";
import { useState } from "react";

export function LoggedNavbar() {
  const [selected, setSelected] = useState(null);

  return (
    <Navbar
      className="w-[16rem] py-[2em] h-[100vh]"
      classNames={{
        wrapper: "flex-col pl-[1.8em] pr-[0] items-start h-full",
        brand: "flex-grow-0",
      }}
    >
      <NavbarBrand>
        <RouteLink className="flex items-center" to="/">
          <GoRouteLogo />
          <p>{APP_NAME}</p>
        </RouteLink>
      </NavbarBrand>
      <NavbarContent
        className="hidden sm:flex gap-4 h-[70%] flex-col items-start py-[4em]"
        justify="start"
      >
        <Tabs
          size="lg"
          classNames={{
            tabList: "flex flex-col bg-[transparent]",
            tab: "justify-start",
            cursor: "shadow-custom",
            tabContent: "group-data-[selected=true]:text-primary",
          }}
          aria-label="Options"
          onSelectionChange={(key) => setSelected(key)}
        >
          <Tab
            key="activities"
            title={
              <div className="flex items-center space-x-2">
                <Runner
                  color={
                    selected === "activities" ? PRIMARY_COLOR : DEFAULT_COLOR
                  }
                />
                <span>Actividades</span>
              </div>
            }
          ></Tab>
          <Tab
            key="posts"
            title={
              <div className="flex items-center space-x-2">
                <Posts
                  color={selected === "posts" ? PRIMARY_COLOR : DEFAULT_COLOR}
                />
                <span>Publicaciones</span>
              </div>
            }
          ></Tab>
          <Tab
            key="map"
            title={
              <div className="flex items-center space-x-2">
                <Map
                  color={selected === "map" ? PRIMARY_COLOR : DEFAULT_COLOR}
                />
                <span>Mapa</span>
              </div>
            }
          ></Tab>
          <Tab
            key="create"
            title={
              <div className="flex items-center space-x-2">
                <Create
                  color={selected === "create" ? PRIMARY_COLOR : DEFAULT_COLOR}
                />
                <span>Crear</span>
              </div>
            }
          ></Tab>
          <Tab
            key="chats"
            title={
              <div className="flex items-center space-x-2">
                <Chat
                  color={selected === "chats" ? PRIMARY_COLOR : DEFAULT_COLOR}
                />
                <span>Mensajes</span>
              </div>
            }
          ></Tab>
          <Tab
            key="notifications"
            title={
              <div className="flex items-center space-x-2">
                <Notifications
                  color={
                    selected === "notifications" ? PRIMARY_COLOR : DEFAULT_COLOR
                  }
                />
                <span>Notificaciones</span>
              </div>
            }
          ></Tab>
        </Tabs>
        {/*  <NavbarItem>
          <Link href="#" color="foreground">
            <Posts />
            <p className="mt-auto ml-[10px]">Publicaciones</p>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#" color="foreground">
            <Runner />
            <p className="mt-auto ml-[10px]">Actividades</p>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            <Map />
            <p className="mt-auto ml-[10px]">Mapa</p>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            <Create />
            <p className="my-auto ml-[10px]">Crear</p>
          </Link>
        </NavbarItem> */}
      </NavbarContent>
      <NavbarContent justify="none" className="grow-0 h-[10%]">
        <Logged />
      </NavbarContent>
    </Navbar>
  );
}
