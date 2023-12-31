import { create } from "zustand";
import { getFromStorage } from "../services/storage";
import { createActivity, deleteActivity, getYourActivities, updateActivity } from "../services/activity";

export const useUserActivitiesStore = create((set) => {

    const authToken = getFromStorage('AuthToken') || null;

    const setYourActivities = async () => {
        if (authToken) {
            const fetchedActivities = await getYourActivities(authToken)

            set({ yourActivities: fetchedActivities })
        }
    }

    setYourActivities()

    return {
        yourActivities: null,

        addActivity: async (activityData, authToken) => {

            try {
                const response = await createActivity(activityData, authToken)

                setYourActivities()

                return response
            } catch (error) {
                throw new Error(`Error añadiendo actividad ${error.message}`);
            }
        },

        editActivity: async (updatedActivityData) => {
            try {
                const response = await updateActivity(authToken, updatedActivityData)

                setYourActivities()

                return response
            } catch (error) {
                throw new Error(`Error añadiendo actividad ${error.message}`);
            }
        },

        deleteActivity: async (activityId) => {
            try {
                const response = await deleteActivity(authToken, activityId)

                setYourActivities()

                return response
            } catch (error) {
                throw new Error(`Error añadiendo actividad ${error.message}`);
            }
        },

        cleanActivities: () => set({ yourActivities: null }),
    }
})