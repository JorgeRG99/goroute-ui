import { ADD_POST_ENDPOINT, DELETE_POST_ENDPOINT, EDIT_POST_ENDPOINT, GET_POSTS_FEED_ENDPOINT, GET_POST_LIKES_ENDPOINT, GET_USER_POSTS_ENDPOINT, GET_YOUR_POSTS_ENDPOINT, LIKE_POST_ENDPOINT, UNLIKE_POST_ENDPOINT } from "../../config";

export const getPostsFeed = async (authToken, from) => {
    try {
        const res = await fetch(`${GET_POSTS_FEED_ENDPOINT}?from=${from}`, {
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

export const getUserPosts = async (authToken, username) => {
    try {
        const res = await fetch(`${GET_USER_POSTS_ENDPOINT}?username=${username}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        if (!res.ok) throw new Error(`Error en la solicitud ${res.status}`)

        const response = await res.json();

        return response;
    } catch (error) {
        throw new Error(`Error obteniendo las actividades del usuario ${error.message}`);
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

export const updatePost = async (authToken, updatedPostData) => {
    try {
        const res = await fetch(EDIT_POST_ENDPOINT, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify(updatedPostData),
        });
        if (!res.ok) throw new Error(`Error en la solicitud ${res.status}`)

        const response = await res;

        return response;
    } catch (error) {
        throw new Error(`Error actualizando actividad ${error.message}`);
    }
}

export const postLikes = async (authToken, postId) => {
    try {
        const res = await fetch(`${GET_POST_LIKES_ENDPOINT}?id=${postId}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
        });
        if (!res.ok) throw new Error(`Error en la solicitud ${res.status}`)

        const response = await res.json();

        return response;
    } catch (error) {
        throw new Error(`Error obteniendo likes de actividad ${error.message}`);
    }
}

export const likePost = async (authToken, postId) => {
    try {
        const res = await fetch(LIKE_POST_ENDPOINT, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify({
                id: postId
            }),
        });
        if (!res.ok) throw new Error(`Error en la solicitud ${res.status}`)

        const response = await res;

        return response;
    } catch (error) {
        throw new Error(`Error actualizando likes de actividad ${error.message}`);
    }
}
export const unlikePost = async (authToken, postId) => {
    try {
        const res = await fetch(UNLIKE_POST_ENDPOINT, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify({
                id: postId
            }),
        });
        if (!res.ok) throw new Error(`Error en la solicitud ${res.status}`)

        const response = await res;

        return response;
    } catch (error) {
        throw new Error(`Error actualizando likes de actividad ${error.message}`);
    }
}

export const deletePost = async (authToken, postId) => {
    try {
        const res = await fetch(`${DELETE_POST_ENDPOINT}?id=${postId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
        });
        if (!res.ok) throw new Error(`Error en la solicitud ${res.status}`)

        const response = await res;

        return response;
    } catch (error) {
        throw new Error(`Error eliminando actividad ${error.message}`);
    }
}