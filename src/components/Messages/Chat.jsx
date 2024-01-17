import { Button, Textarea } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { Send } from "../Icons/Send";
import { sendMessage } from "../../services/chat";
import { useUserSessionStore } from "../../store/userSession";
import { ChatMessageCard } from "../Cards/ChatMessageCard";
import PropTypes from "prop-types";
import { useSocket } from "../../hooks/useSocket";
import { TERTIARY_COLOR } from "../../../config";
import { ChatHeader } from "./ChatHeader";

export function Chat({ chat }) {
  const authToken = useUserSessionStore((state) => state.authToken);
  const userData = useUserSessionStore((state) => state.userData);
  const [messageContent, setMessageContent] = useState("");
  const [chatMessages, setChatMessages] = useState(chat.messages);
  useSocket(chat.id, setChatMessages);

  const handleMessageContentChange = (e) => setMessageContent(e.target.value);

  const handleKeyDown = (e) =>
    e.key === "Enter" && !e.shiftKey && handleMessageSent();

  const handleMessageSent = async () => {
    if (messageContent !== "") {
      await sendMessage(authToken, {
        chat_id: chat.id,
        content: messageContent,
      });

      setMessageContent("");

      setChatMessages((prevState) => {
        return [
          ...prevState,
          {
            id: crypto.randomUUID(),
            content: messageContent,
            user: userData,
          },
        ];
      });
    }
  };

  const endOfMessagesRef = useRef(null);

  useEffect(
    () => endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" }),
    [chatMessages.length]
  );

  return (
    <div className="flex flex-col gap-[1.5em] w-full h-full">
      <ChatHeader userChat={chat.user} />
      <div className="h-[85%] w-[35em] flex flex-col items-end bg-[#f7f9ff] justify-end px-[1em] py-3 ml-auto shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-2xl m-auto">
        {
          <ul className="w-full h-auto flex flex-col gap-[2em] mb-[1em] overflow-y-auto no-scrollbar py-[.5em]">
            {chatMessages?.map((message) => (
              <li key={message.id} className="w-full h-auto">
                <ChatMessageCard messageData={message} />
              </li>
            ))}
            <div ref={endOfMessagesRef} />
          </ul>
        }
        <span className="w-full flex justify-between items-center">
          <Textarea
            minRows={1.5}
            maxRows={4}
            autoFocus
            placeholder="Mensaje"
            name="messsage"
            variant="shadow"
            classNames={{
              innerWrapper: "items-end",
              inputWrapper:
                "bg-white group-data-[focus=true]:bg-white data-[hover=true]:bg-white h-full",
              input: "h-full",
              base: "h-full",
            }}
            size="sm"
            value={messageContent}
            onChange={handleMessageContentChange}
            onKeyDown={handleKeyDown}
            endContent={
              <Button
                onPress={handleMessageSent}
                radius="full"
                className="bg-transparent hover:bg-tertiary hover:bg-opacity-[0.3] h-full"
                isIconOnly
              >
                <Send color={TERTIARY_COLOR} />
              </Button>
            }
          />
        </span>
      </div>
    </div>
  );
}

Chat.propTypes = {
  chat: PropTypes.object.isRequired,
};
