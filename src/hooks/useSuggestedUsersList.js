import { useEffect, useState } from "react";
import { suggestedUsers } from "../services/activity";
import { useUserSessionStore } from "../store/userSession";

export const useSuggestedUsersList = (type) => {
    const [usersList, setUsersList] = useState();
    const authToken = useUserSessionStore((state) => state.authToken);

    useEffect(() => {
        const getSuggestedUsers = async () => {
            try {
                const users = await suggestedUsers(authToken, type);
                setUsersList(users);
            } catch (error) {
                console.error("Error fetching suggested users:", error);
            }
        };

        getSuggestedUsers();
    }, []);

    return { usersList }
}
