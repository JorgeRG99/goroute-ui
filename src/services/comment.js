import { ADD_COMMENT_ENDPOINT, DELETE_COMMENT_ENDPOINT,  GET_LAST_COMMENT_ENDPOINT, LIKE_COMMENT_ENDPOINT, MORE_COMMENTS_ENDPOINT, UNLIKE_COMMENT_ENDPOINT } from "../../config";

export const getLatestComment = async (authToken, postId) => {
    try {
        const res = await fetch(`${GET_LAST_COMMENT_ENDPOINT}?id=${postId}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
        });
        if (!res.ok) throw new Error(`Error en la solicitud ${res.status}`)

        const response = await res.json();

        return response;
    } catch (error) {
        throw new Error(`Error obteniendo comentario ${error.message}`);
    }
}

export const insertComment = async (authToken, commentData) => {
    try {
        const res = await fetch(`${ADD_COMMENT_ENDPOINT}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify(commentData)
        });
        if (!res.ok) return res.status

    } catch (error) {
        throw new Error(`Error insertando comentario ${error.message}`);
    }
}

export const getMoreComments = async (authToken, postId, from) => {
    try {
        const res = await fetch(`${MORE_COMMENTS_ENDPOINT}?from=${from}&post_id=${postId}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
        });
        if (!res.ok) throw new Error(`Error en la solicitud ${res.status}`)

        const response = await res.json();

        return response;
    } catch (error) {
        throw new Error(`Error obteniendo comentarios ${error.message}`);
    }
}

export const commentDelete = async (authToken, commentId) => {
    try {
        const res = await fetch(`${DELETE_COMMENT_ENDPOINT}?comment_id=${commentId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
        });
        if (!res.ok) throw new Error(`Error en la solicitud ${res.status}`)

        const response = await res.json();

        return response;
    } catch (error) {
        throw new Error(`Error obteniendo comentarios ${error.message}`);
    }
}

export const likeComment = async (authToken, commentId) => {
    try {
        const res = await fetch(`${LIKE_COMMENT_ENDPOINT}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify({
                id: commentId
            })
        });
        if (!res.ok) throw new Error(`Error en la solicitud ${res.status}`)

        const response = await res.json();

        return response;
    } catch (error) {
        throw new Error(`Error enviando me gusta ${error.message}`);
    }
}

export const unlikeComment = async (authToken, commentId) => {
    try {
        const res = await fetch(`${UNLIKE_COMMENT_ENDPOINT}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify({
                id: commentId
            })
        });
        if (!res.ok) throw new Error(`Error enviando me gusta ${res.status}`)

        const response = await res.json();

        return response;
    } catch (error) {
        throw new Error(`Error obteniendo comentarios ${error.message}`);
    }
}