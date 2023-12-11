import { useContext, useEffect, useState } from "react";
import { getUserActivities, createActivity } from "../services/activity"
import { UserContext } from "../context/user";

export function useActivity() {
    const [userActivities, setUserActivities] = useState(null);
    const { userData } = useContext(UserContext);

    useEffect(() => {
        const getActivities = async () => {
            if (userData.authToken) {
                try {
                    const activities = await getUserActivities(userData.authToken);
                    setUserActivities(activities);
                } catch (error) {
                    console.error('Error fetching activities:', error);
                }
            }
        };

        getActivities()

    }, [userData.authToken]);

    const addActivity = async (activityData) => {
        try {
            return await createActivity(activityData, userData.authToken)
        } catch (error) {
            throw new Error(`Error en el registro de usuario ${error.message}`);
        }
    }

    return { userActivities, addActivity }
}