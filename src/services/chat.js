import { CHAT_WITH_ENDPOINT, GET_YOUR_CHATS_ENDPOINT, SENT_CHAT_MESSAGE_ENDPOINT } from "../../config";

export const getYourChats = async (authToken) => {
    try {
        const res = await fetch(GET_YOUR_CHATS_ENDPOINT, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        if (!res.ok) throw new Error(`Error en la solicitud ${res.status}`)

        const response = await res.json();

        return response;
    } catch (error) {
        throw new Error(`Error obteniendo chats del usuario ${error.message}`);
    }
}

export const chatWith = async (authToken, userId) => {
    try {
        const res = await fetch(`${CHAT_WITH_ENDPOINT}?user_id=${userId}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        if (!res.ok) throw new Error(`Error en la solicitud ${res.status}`)

        const response = await res.json();

        return response;
    } catch (error) {
        throw new Error(`Error obteniendo chats del usuario ${error.message}`);
    }
}

export const sendMessage = async (authToken, messageData) => {
    try {
        const res = await fetch(SENT_CHAT_MESSAGE_ENDPOINT, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(messageData)
        });
        if (!res.ok) throw new Error(`Error en la solicitud ${res.status}`)

        const response = await res.json();

        return response;
    } catch (error) {
        throw new Error(`Error enviando mensaje ${error.message}`);
    }
}