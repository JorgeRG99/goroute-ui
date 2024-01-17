import { Map } from "../../icons/Map";
import { Create } from "../../icons/Create";
import { Runner } from "../../icons/Runner";
import { Posts } from "../../icons/Posts";
import { Chat } from "../../icons/Chat";
import { Notifications } from "../../icons/Notifications";
import {
  DEFAULT_COLOR,
  PRIMARY_COLOR,
  TERTIARY_COLOR,
} from "../../../../config";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, Tab, Tabs } from "@nextui-org/react";
import { userInitials } from "../../../services/helpers";
import { Popups, usePopups } from "../../../hooks/usePopups";
import { useEffect, useState } from "react";
import { useUserSessionStore } from "../../../store/userSession";
import { SearchNavbar } from "../../Icons/SearchNavbar";
import { PAGES_URLS } from "../../../../config";

export function LoggedTabs() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(pathname);
  const userData = useUserSessionStore((state) => state.userData);
  const { togglePopup } = usePopups();

  useEffect(() => {
    if (pathname.startsWith("/messages")) {
      setSelected("/messages");
    } else {
      setSelected(pathname);
    }
  }, [pathname]);

  const handleSelectionChange = (key) => {
    setSelected(key);
    if (key.startsWith("/")) navigate(key);
  };

  return (
    <Tabs
      size="lg"
      classNames={{
        tabList: "flex flex-col bg-[transparent]",
        tab: "justify-start",
        cursor: "shadow-custom",
        base: "mr-[1rem]",
      }}
      onSelectionChange={handleSelectionChange}
      selectedKey={selected}
    >
      <Tab
        key="search"
        title={
          <div
            onClick={() => togglePopup(Popups.FindUser)}
            className="flex items-center space-x-3"
          >
            <SearchNavbar
              color={selected === "search" ? PRIMARY_COLOR : DEFAULT_COLOR}
            />
            <span className="hidden xl:flex">Buscar</span>
          </div>
        }
      />
      <Tab
        key={PAGES_URLS.home}
        title={
          <div className="flex items-center space-x-2">
            <Runner color={selected === "/" ? PRIMARY_COLOR : DEFAULT_COLOR} />
            <span className="hidden xl:flex">Actividades</span>
          </div>
        }
      />
      <Tab
        key={PAGES_URLS.posts}
        title={
          <div className="flex items-center space-x-2">
            <Posts
              color={selected === "/posts" ? PRIMARY_COLOR : DEFAULT_COLOR}
            />
            <span className="hidden xl:flex">Publicaciones</span>
          </div>
        }
      />
      <Tab
        key="map"
        title={
          <div className="flex items-center space-x-2">
            <Map color={selected === "map" ? PRIMARY_COLOR : DEFAULT_COLOR} />
            <span className="hidden xl:flex">Mapa</span>
          </div>
        }
      />
      <Tab
        key="create"
        title={
          <div
            onClick={() => togglePopup(Popups.CreateContent)}
            className="flex items-center space-x-2"
          >
            <Create
              color={selected === "create" ? PRIMARY_COLOR : DEFAULT_COLOR}
            />
            <span className="hidden xl:flex">Crear</span>
          </div>
        }
      />
      <Tab
        key={PAGES_URLS.chats}
        title={
          <div className="flex items-center space-x-2">
            <Chat
              color={
                pathname.includes("/messages") ? TERTIARY_COLOR : DEFAULT_COLOR
              }
            />
            <span className="hidden xl:flex">Mensajes</span>
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
            <span className="hidden xl:flex">Notificaciones</span>
          </div>
        }
      />
      <Tab
        key={PAGES_URLS.yourProfile}
        title={
          <div className="flex items-center space-x-2">
            <Avatar
              src={userData.avatar || undefined}
              size="sm"
              name={userInitials(userData.name, userData.surname)}
              className={selected === "/profile" && "bg-primary text-white"}
            />
            <span className="hidden xl:flex">Perfil</span>
          </div>
        }
      />
    </Tabs>
  );
}
