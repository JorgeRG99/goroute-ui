import { create } from "zustand";
import { getSports } from "../services/sports";
import { getFromStorage } from "../services/storage";

export const useUserActivities = create((set) => {

    const authToken = getFromStorage('AuthToken') || null;

    const setSports = async () => {
        if (authToken) {
            const sportsData = await getSports(authToken)

            set({ sports: sportsData })
        }
    }

    setSports()

    return {
        sports: null
    }
})