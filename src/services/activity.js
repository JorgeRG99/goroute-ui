import { GET_USER_ACTIVITIES_ENDPOINT } from "../../config"

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