import { Tab, Tabs } from "@nextui-org/tabs";
import { Chat } from "./Chat";
import PropTypes from "prop-types";
import { SelectChatCard } from "../Cards/SelectChatCard";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";

export function Chats({ yourChats }) {
  const { pathUsername } = useParams();
  const [selectedChat, setSelectedChat] = useState(pathUsername);
  return (
    <>
      {yourChats && (
        <Tabs
          size="lg"
          classNames={{
            tabList: "flex flex-col bg-[transparent] w-full h-full",
            tab: "justify-start w-full h-[4em]",
            cursor: "shadow-custom w-full h-[4em]",
            base: "mx-[2rem] pt-[1em] w-[25em]",
            panel: "p-0 w-[60%]",
            tabContent: "flex items-center w-full",
          }}
          selectedKey={selectedChat}
          onSelectionChange={(key) => setSelectedChat(key)}
        >
          {yourChats.map((chat) => (
            <Tab
              key={chat.user.username}
              className="w-full"
              title={
                <Link to={`/messages/${chat.user.username}`} className="w-full">
                  <SelectChatCard
                    user={chat.user}
                    lastMessage={chat.messages.slice(-1)[0]}
                  />
                </Link>
              }
            >
              <Chat chat={chat} />
            </Tab>
          ))}
        </Tabs>
      )}
    </>
  );
}

Chats.propTypes = {
  yourChats: PropTypes.array,
};
