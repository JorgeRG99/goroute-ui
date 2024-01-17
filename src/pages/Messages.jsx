import { Divider } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { getYourChats } from "../services/chat";
import { useUserSessionStore } from "../store/userSession";
import { Chats } from "../components/Messages/Chats";
//import ChatSelector from "../components/Messages/ChatSelector";

export function Messages() {
  const [yourChats, setYourChats] = useState(null);
  const authToken = useUserSessionStore((state) => state.authToken);

  useEffect(() => {
    const getUserChats = async () => {
      const userChats = await getYourChats(authToken);
      setYourChats(userChats);
    };

    getUserChats();
  }, []);

  return (
    <section className="flex w-full">
      <Divider orientation="vertical" className="h-full" />
      <div className="w-full h-[100vh]">
        <div className="h-[10%] flex-col items-center py-4">
          <h2 className="font-semibold text-[1.9em] ml-[2rem] text-tertiary">
            Chats
          </h2>
        </div>
        <div className="flex w-full h-[88%] justify-between">
          <Chats yourChats={yourChats} />
        </div>
      </div>
    </section>
  );
}

export default Messages;
