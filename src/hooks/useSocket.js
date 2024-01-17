import { useEffect } from "react";
import { createSocketConnection } from "../services/socket.js";
import { useUserSessionStore } from "../store/userSession.js"

export const useSocket = (chatId, setChatMessages) => {
    const authToken = useUserSessionStore(state => state.authToken)
    const userData = useUserSessionStore(state => state.userData)

    useEffect(() => {
        createSocketConnection(authToken);

        const channel = window.Echo.channel(`chat.${chatId}`)
        const messageSentCallback = (e) => {
            const { message } = e;

            if (userData.username !== message.user.username) {
                setChatMessages(prevState => [...prevState, message]);
            }
        };

        channel.listen('MessageSent', messageSentCallback)

        return () => {
            channel.stopListening('MessageSent', messageSentCallback);
        };
    }, [chatId, authToken, setChatMessages, userData]);


    /* const sendTypingEvent = () => {
        window.Echo.channel(`chat.${chatId}`)
                    .whisper('typing', 'ahahaha')
    }

    return  { sendTypingEvent } */
};
