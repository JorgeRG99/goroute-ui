import { Map } from "../../icons/Map";
import { Create } from "../../icons/Create";
import { Runner } from "../../icons/Runner";
import { Posts } from "../../icons/Posts";
import { Chat } from "../../icons/Chat";
import { Notifications } from "../../icons/Notifications";
import { DEFAULT_COLOR, PRIMARY_COLOR } from "../../../../config";
import { Link, useLocation } from "react-router-dom";
import { Avatar, Tab, Tabs } from "@nextui-org/react";
import { userInitials } from "../../../services/helpers";
import { Popups, usePopups } from "../../../hooks/usePopups";
import { useState } from "react";
import { useUserSessionStore } from "../../../store/userSession";

export function LoggedTabs() {
  const [selected, setSelected] = useState("/");
  const { pathname } = useLocation();
  const userData = useUserSessionStore((state) => state.userData);
  const { togglePopup } = usePopups();

  return (
    <Tabs
      size="lg"
      classNames={{
        tabList: "flex flex-col bg-[transparent]",
        tab: "justify-start",
        cursor: "shadow-custom",
      }}
      onSelectionChange={(key) => setSelected(key)}
      selectedKey={pathname}
    >
      <Tab
        id="/"
        key="/"
        title={
          <Link to="/" className="flex items-center space-x-2">
            <Runner color={selected === "/" ? PRIMARY_COLOR : DEFAULT_COLOR} />
            <span>Actividades</span>
          </Link>
        }
      />
      <Tab
        id="/posts"
        key="/posts"
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
            <Map color={selected === "map" ? PRIMARY_COLOR : DEFAULT_COLOR} />
            <span>Mapa</span>
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
        key={`/profile`}
        title={
          <Link to={`/profile`} className="flex items-center space-x-2">
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
  );
}
