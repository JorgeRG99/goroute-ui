import { useEffect, useState } from "react";
import { getUserActivities } from "../services/activity"
import { useAuth } from "./useAuth";

export function useActivity() {
    const [userActivities, setUserActivities] = useState([]);
    const { userData } = useAuth();

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

    return { getUserActivities, userActivities }
}