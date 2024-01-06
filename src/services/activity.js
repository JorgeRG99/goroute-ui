import { GET_USER_ACTIVITIES_ENDPOINT, GET_ACTIVITIES_FEED_ENDPOINT, ADD_ACTIVITY_ENDPOINT, GET_ACTIVITY_PARTICIPANTS_ENDPOINT, ADD_PARTICIPANT_ENDPOINT, REMOVE_PARTICIPANT_ENDPOINT, GET_ACTIVITY_LIKES_ENDPOINT, LIKE_ACTIVITY_ENDPOINT, UNLIKE_ACTIVITY_ENDPOINT, EDIT_ACTIVITY_ENDPOINT, GET_YOUR_ACTIVITIES_ENDPOINT, DELETE_ACTIVITY_ENDPOINT, SUGGESTED_USERS_ENDPOINT } from "../../config"

export const getYourActivities = async (authToken) => {
    try {
        const res = await fetch(GET_YOUR_ACTIVITIES_ENDPOINT, {
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

export const getUserActivities = async (authToken, username) => {
    try {
        const res = await fetch(`${GET_USER_ACTIVITIES_ENDPOINT}?username=${username}`, {
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

export const getActivitiesFeed = async (authToken, from, { firstFilter = undefined, secondFilter = undefined } = {}) => {
    const feedUrl = firstFilter && !secondFilter ?
        `${GET_ACTIVITIES_FEED_ENDPOINT}?from=${from}&sport=${firstFilter}` :
        secondFilter && !firstFilter ?
            `${GET_ACTIVITIES_FEED_ENDPOINT}?from=${from}&title=${secondFilter}` :
            secondFilter && firstFilter ?
                `${GET_ACTIVITIES_FEED_ENDPOINT}?from=${from}&title=${secondFilter}&sport=${firstFilter}` :
                `${GET_ACTIVITIES_FEED_ENDPOINT}?from=${from}`

    try {
        const res = await fetch(feedUrl, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            },
        });
        if (!res.ok) throw new Error(`Error en la solicitud ${res.status}`)

        const response = await res.json();

        return response;
    } catch (error) {
        throw new Error(`Error obteniendo el feed de actividades ${error.message}`);
    }
}

export const createActivity = async (activityData, authToken) => {
    try {
        const res = await fetch(ADD_ACTIVITY_ENDPOINT, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(activityData),
        });
        if (!res.ok) throw new Error(`Error en la solicitud ${res.status}`)

        const response = await res.json();

        return response;
    } catch (error) {
        throw new Error(`Error en el registro de actividad ${error.message}`);
    }
}
export const suggestedUsers = async (authToken, type) => {
    try {
        const res = await fetch(`${SUGGESTED_USERS_ENDPOINT}${type}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
        });
        if (!res.ok) throw new Error(`Error en la solicitud ${res.status}`)

        const response = await res.json();

        return response;
    } catch (error) {
        throw new Error(`Error obteniendo usuarios sugeridos ${error.message}`);
    }
}

export const activityLikes = async (authToken, activityId) => {
    try {
        const res = await fetch(`${GET_ACTIVITY_LIKES_ENDPOINT}?id=${activityId}`, {
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

export const likeActivity = async (authToken, activityId) => {
    try {
        const res = await fetch(LIKE_ACTIVITY_ENDPOINT, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify({
                id: activityId
            }),
        });
        if (!res.ok) throw new Error(`Error en la solicitud ${res.status}`)

        const response = await res;

        return response;
    } catch (error) {
        throw new Error(`Error actualizando likes de actividad ${error.message}`);
    }
}
export const unlikeActivity = async (authToken, activityId) => {
    try {
        const res = await fetch(UNLIKE_ACTIVITY_ENDPOINT, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify({
                id: activityId
            }),
        });
        if (!res.ok) throw new Error(`Error en la solicitud ${res.status}`)

        const response = await res;

        return response;
    } catch (error) {
        throw new Error(`Error actualizando likes de actividad ${error.message}`);
    }
}

export const activityParticipants = async (authToken, activityId) => {
    try {
        const res = await fetch(`${GET_ACTIVITY_PARTICIPANTS_ENDPOINT}?id=${activityId}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
        });
        if (!res.ok) throw new Error(`Error en la solicitud ${res.status}`)

        const response = await res.json();

        return response;
    } catch (error) {
        throw new Error(`Error obteniendo los participantes de la actividad ${error.message}`);
    }
}

export const addParticipant = async (authToken, activityId) => {
    try {
        const res = await fetch(ADD_PARTICIPANT_ENDPOINT, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify({
                id: activityId
            }),
        });
        if (!res.ok) throw new Error(`Error en la solicitud ${res.status}`)

        const response = await res;

        return response;
    } catch (error) {
        throw new Error(`Error actualizando los participantes de la actividad ${error.message}`);
    }
}

export const removeParticipant = async (authToken, activityId, userId) => {
    try {
        const res = await fetch(REMOVE_PARTICIPANT_ENDPOINT, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify({
                activity_id: activityId,
                user_id: userId
            }),
        });
        if (!res.ok) throw new Error(`Error en la solicitud ${res.status}`)

        const response = await res;

        return response;
    } catch (error) {
        throw new Error(`Error actualizando los participantes de la actividad ${error.message}`);
    }
}

export const updateActivity = async (authToken, updatedActivityData) => {
    try {
        const res = await fetch(EDIT_ACTIVITY_ENDPOINT, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify(updatedActivityData),
        });
        if (!res.ok) throw new Error(`Error en la solicitud ${res.status}`)

        const response = await res;

        return response;
    } catch (error) {
        throw new Error(`Error actualizando actividad ${error.message}`);
    }
}

export const deleteActivity = async (authToken, activityId) => {

    try {
        const res = await fetch(`${DELETE_ACTIVITY_ENDPOINT}?id=${activityId}`, {
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