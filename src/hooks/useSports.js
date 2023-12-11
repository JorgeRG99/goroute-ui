import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/user";
import { getSports } from "../services/sports";

export function useSports () {
    const [ sports, setSports] = useState(null)
    const { userData } = useContext(UserContext);

    useEffect(() => {
        const getAvailableSports = async () => {
            if (userData.authToken) {
                try {
                    const sports = await getSports(userData.authToken);
                    setSports(sports);
                } catch (error) {
                    console.error('Error fetching activities:', error);
                }
            }
        };

        getAvailableSports()

    }, [userData.authToken]);


    return { sports }
}