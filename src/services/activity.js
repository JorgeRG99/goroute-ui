import { GET_USER_ACTIVITIES_ENDPOINT, GET_ACTIVITIES_FEED_ENDPOINT, ADD_ACTIVITY_ENDPOINT, SUGGESTED_USERS_BY_ACTIVITY } from "../../config"

export const getUserActivities = async (authToken) => {
    try {
        const res = await fetch(GET_USER_ACTIVITIES_ENDPOINT, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            },
        });
        if (!res.ok) throw new Error(`Error en la solicitud ${res.status}`)

        const response =  await res.json();

        return response;
    } catch (error) {
        throw new Error(`Error en el registro de usuario ${error.message}`);
    }
}

export const getActivitiesFeed = async (authToken) => {
    try {
        const res = await fetch(GET_ACTIVITIES_FEED_ENDPOINT, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            },
        });
        if (!res.ok) throw new Error(`Error en la solicitud ${res.status}`)

        const response =  await res.json();

        return response;
    } catch (error) {
        throw new Error(`Error en el registro de usuario ${error.message}`);
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

        const response =  await res.json();

        return response;
    } catch (error) {
        throw new Error(`Error en el registro de actividad ${error.message}`);
    }
}
export const suggestedUsers = async (authToken) => {
    try {
        const res = await fetch(SUGGESTED_USERS_BY_ACTIVITY, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
        });
        if (!res.ok) throw new Error(`Error en la solicitud ${res.status}`)

        const response =  await res.json();

        return response;
    } catch (error) {
        throw new Error(`Error en el registro de actividad ${error.message}`);
    }
}