import { useEffect, useState } from "react"
import { getUserById } from "../services/user"
import { useUserSessionStore } from "../store/userSession";

export const useUserById = (userId) => {
    const authToken = useUserSessionStore((state) => state.authToken);
    const [profileData, setProfileData] = useState(null);
   

    useEffect(() => {
        const getProfileData = async () => {
            const user = await getUserById(authToken, userId);

            setProfileData(user);
        };

        getProfileData();
    }, []);

    return { profileData }
}