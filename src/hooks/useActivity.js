import { useContext } from "react";
import { getUserActivities, createActivity } from "../services/activity"
import { UserContext } from "../context/user";

export function useActivity() {
    const { userData } = useContext(UserContext);

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
            return await createActivity(activityData, userData.authToken)
        } catch (error) {
            throw new Error(`Error en el registro de usuario ${error.message}`);
        }
    }

    return { addActivity, getActivitiesByUser }
}