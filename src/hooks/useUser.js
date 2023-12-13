import { useContext, useEffect, useState } from "react"
import { userByUsername } from "../services/user"
import { UserContext } from "../context/user"
import { useParams } from "react-router-dom";
import { getUserCreationDate } from "../services/helpers";

export const useUser = () => {
    const { userData } = useContext(UserContext);
    const [userSince, setUserSince] = useState("");
    const [profileData, setProfileData] = useState(null);
    const { username } = useParams();

    useEffect(() => {
        const getProfileData = async () => {
            const user = await getUserByUsername(username);
            setProfileData(user);

            const year = user.created_at.slice(0, 4);
            const month = user.created_at.slice(5, 7);

            setUserSince(getUserCreationDate(year, month));
        };

        getProfileData();
    }, [username, userData]);

    const getUserByUsername = async (username) => {
        try {
            const user = await userByUsername(userData.authToken, username)
            return user;
        } catch (error) {
            throw new Error(`Error obteniendo datos del ususario de usuario ${error.message}`);
        }
    }

    return { getUserByUsername, profileData, userSince }
}