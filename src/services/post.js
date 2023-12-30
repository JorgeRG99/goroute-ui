import { ADD_POST_ENDPOINT, GET_POSTS_FEED_ENDPOINT, GET_YOUR_POSTS_ENDPOINT } from "../../config";

export const getPostsFeed = async (authToken) => {
    try {
        const res = await fetch(GET_POSTS_FEED_ENDPOINT, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            },
        });
        if (!res.ok) throw new Error(`Error en la solicitud ${res.status}`)

        const response = await res.json();

        return response;
    } catch (error) {
        throw new Error(`Error obteniendo el feed de publicaciones ${error.message}`);
    }
}

export const getYourPosts = async (authToken) => {
    try {
        const res = await fetch(GET_YOUR_POSTS_ENDPOINT, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        if (!res.ok) throw new Error(`Error en la solicitud ${res.status}`)

        const response = await res.json();

        return response;
    } catch (error) {
        throw new Error(`Error leyendo las actividades del usuario ${error.message}`);
    }
}

export const createPost = async (postData, authToken) => {
    try {
        const res = await fetch(ADD_POST_ENDPOINT, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        });
        if (!res.ok) throw new Error(`Error en la solicitud ${res.status}`)

        const response = await res.json();

        return response;
    } catch (error) {
        throw new Error(`Error en el registro de actividad ${error.message}`);
    }
}