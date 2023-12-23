import { useContext, useEffect, useState } from "react";
import { getUserActivities, createActivity, updateActivity } from "../services/activity"
import { UserContext } from "../context/user";

export function useActivity(username) {
    const { userData } = useContext(UserContext);
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
            const activities = await getUserActivities(userData.authToken, username);
            return activities;
        } catch (error) {
            console.error('Error fetching activities:', error);
        }
    };

    const addActivity = async (activityData) => {
        try {
            const response = await createActivity(activityData, userData.authToken)

            console.log(userActivities.length)
            userActivities.push(activityData)
            console.log(userActivities.length)

            return response
        } catch (error) {
            throw new Error(`Error añadiendo actividad ${error.message}`);
        }
    }

    const editActivity = async (updatedActivityData) => {
        try {
            const response = await updateActivity(userData.authToken, updatedActivityData)

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