import { useEffect, useState } from "react";
import { getUserActivities, createActivity, updateActivity } from "../services/activity"
import { useUserSessionStore } from "../store/userSession";

export function useActivity(pathUsername) {
    const authToken = useUserSessionStore(state => state.authToken);
    const userData = useUserSessionStore(state => state.userData);
    const [userActivities, setUserActivities] = useState([]);
    const username = pathUsername ? pathUsername : userData.username

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

    const addActivity = async (activityData) => {
        try {
            const response = await createActivity(activityData, authToken)

            userActivities.push(activityData)

            return response
        } catch (error) {
            throw new Error(`Error añadiendo actividad ${error.message}`);
        }
    }

    const editActivity = async (updatedActivityData) => {
        try {
            const response = await updateActivity(authToken, updatedActivityData)

            const udpatedUserActivities = userActivities.map(activity =>
                activity.id === updatedActivityData.id ? { ...activity, ...updatedActivityData } : activity
              );

            setUserActivities(udpatedUserActivities)

            return response
        } catch (error) {
            throw new Error(`Error añadiendo actividad ${error.message}`);
        }
    }

    return { addActivity, getActivitiesByUser, editActivity, userActivities }
}