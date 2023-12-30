import { useEffect, useState } from "react";
import { getJoinedActivities } from "../services/user";
import { useUserSessionStore } from "../store/userSession";

export function useUserJoinedActivities(userId) {
    const [joinedActivities, setJoinedActivtities] = useState([])
    const authToken = useUserSessionStore(state => state.authToken)

    useEffect(() => {
        const getUserJoinedActivities = async () => {
            try {
                const response = await getJoinedActivities(userId, authToken)
                setJoinedActivtities(response)
            } catch (error) {
                throw new Error(`Error obteniendo datos del ususario ${error.message}`);
            }
        }

        getUserJoinedActivities()

    }, [])


    return { joinedActivities }
}