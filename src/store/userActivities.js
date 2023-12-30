import { create } from "zustand";
import { getFromStorage } from "../services/storage";
import { createActivity, deleteActivity, getYourActivities, updateActivity } from "../services/activity";

export const useUserActivitiesStore = create((set, get) => {

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

        setUserActivities: async () => {
            const authToken = getFromStorage('AuthToken') || null;
            const fetchedActivities = await getYourActivities(authToken)

            set({ yourActivities: fetchedActivities })
        },

        addActivity: async (activityData, authToken) => {
            const { yourActivities } = get()

            try {
                const response = await createActivity(activityData, authToken)

                activityData.participants = []
                const udpatedUserActivities = [...yourActivities]
                udpatedUserActivities.push(activityData)

                set({ yourActivities: udpatedUserActivities })

                return response
            } catch (error) {
                throw new Error(`Error añadiendo actividad ${error.message}`);
            }
        },

        editActivity: async (updatedActivityData) => {
            const { yourActivities } = get()

            try {
                const response = await updateActivity(authToken, updatedActivityData)

                const udpatedUserActivities = yourActivities.map(activity =>
                    activity.id === updatedActivityData.id ? { ...activity, ...updatedActivityData } : activity
                );

                set({ yourActivities: udpatedUserActivities })

                return response
            } catch (error) {
                throw new Error(`Error añadiendo actividad ${error.message}`);
            }
        },

        deleteActivity: async (activityId) => {
            const { yourActivities } = get()

            try {
                const response = await deleteActivity(authToken, activityId)

                const udpatedUserActivities = yourActivities.filter(activity =>
                    activity.id !== activityId 
                );

                set({ yourActivities: udpatedUserActivities })

                return response
            } catch (error) {
                throw new Error(`Error añadiendo actividad ${error.message}`);
            }
        },

        cleanActivities: () => set({ yourActivities: null }),
    }
})