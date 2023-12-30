import { useEffect, useState } from "react";
import { getUserActivities } from "../services/activity"
import { useUserSessionStore } from "../store/userSession";

export function useActivity(username) {
    const authToken = useUserSessionStore(state => state.authToken);
    const [userActivities, setUserActivities] = useState([]);

    useEffect(() => {
        const getUserActivties = async () => {
            const activities = await getActivitiesByUser(username);

            setUserActivities(activities);
        };

        getUserActivties();
    }, [username, userActivities.length]);

    const getActivitiesByUser = async (username) => {
        try {
            const activities = await getUserActivities(authToken, username);
            return activities;
        } catch (error) {
            console.error('Error fetching activities:', error);
        }
    };

    return { getActivitiesByUser, userActivities }
}