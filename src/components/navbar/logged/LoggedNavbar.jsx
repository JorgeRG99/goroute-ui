import { GoRouteLogo } from "../../icons/GoRouteLogo";
import { Map } from "../../icons/Map";
import { Create } from "../../icons/Create";
import { Runner } from "../../icons/Runner";
import { Posts } from "../../icons/Posts";
import { Link, Link as RouteLink, useLocation } from "react-router-dom";
import { LoggedMenu } from "../logged/LoggedMenu";
import { APP_NAME, DEFAULT_COLOR, PRIMARY_COLOR } from "../../../../config";
import { Chat } from "../../icons/Chat";
import { Notifications } from "../../icons/Notifications";
import { useContext, useState } from "react";
import { UserContext } from "../../../context/user";
import {
  Avatar,
  Tab,
  Tabs,
  Navbar,
  NavbarBrand,
  NavbarContent,
} from "@nextui-org/react";
import { userInitials } from "../../../services/helpers";

export function LoggedNavbar() {
  const [selected, setSelected] = useState("/");
  const { pathname } = useLocation();
  const { userData } = useContext(UserContext);

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
          }}
          aria-label="Tabs"
          onSelectionChange={(key) => setSelected(key)}
          selectedKey={pathname}
        >
          <Tab
            id="/"
            key="/"
            target="/"
            title={
              <Link to="/" className="flex items-center space-x-2">
                <Runner
                  color={selected === "/" ? PRIMARY_COLOR : DEFAULT_COLOR}
                />
                <span>Actividades</span>
              </Link>
            }
          />
          <Tab
            id="/posts"
            key="/posts"
            href="/posts"
            title={
              <div className="flex items-center space-x-2">
                <Posts
                  color={selected === "/posts" ? PRIMARY_COLOR : DEFAULT_COLOR}
                />
                <span>Publicaciones</span>
              </div>
            }
          />
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
          />
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
          />
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
          />
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
          />
          <Tab
            id="/profile"
            key="/profile"
            title={
              <Link to="/profile" className="flex items-center space-x-2">
                <Avatar
                  src={userData.avatar || undefined}
                  size="sm"
                  name={userInitials(userData.name, userData.surname)}
                />
                <span>Perfil</span>
              </Link>
            }
          />
        </Tabs>
      </NavbarContent>
      <NavbarContent justify="none" className="grow-0 h-[10%]">
        <LoggedMenu />
      </NavbarContent>
    </Navbar>
  );
}
