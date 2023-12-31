import { useEffect, useState } from "react"
import { userByUsername } from "../services/user"
import { getUserCreationDate } from "../services/helpers";
import { useUserSessionStore } from "../store/userSession";

export const useUserProfile = (username) => {
    const userData = useUserSessionStore((state) => state.userData);
    const authToken = useUserSessionStore((state) => state.authToken);
    const [userSince, setUserSince] = useState("");
    const [profileData, setProfileData] = useState(null);
   

    useEffect(() => {
        const getProfileData = async () => {
            const user = await getUserByUsername(username);

            setProfileData(user);

            const date = user.created_at.slice(0, 10);

            setUserSince(getUserCreationDate(date));
        };

        getProfileData();
    }, [username, userData.follows.length, userData.followers, userData.biography]);

    const getUserByUsername = async (username) => {
        try {
            const user = await userByUsername(authToken, username)
            return user;
        } catch (error) {
            throw new Error(`Error obteniendo datos del ususario ${error.message}`);
        }
    }

    return { getUserByUsername, setProfileData, profileData, userSince }
}