import { useContext, useEffect, useState } from "react"
import { joinedActivities, userByUsername } from "../services/user"
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
            const joinedActivities = await getUserJoinedActivities(user.id)

            setProfileData({
                ...user,
                joinedActivities: joinedActivities
            });

            const date = user.created_at.slice(0, 10);

            setUserSince(getUserCreationDate(date));
        };

        getProfileData();
    }, [username, userData.follows.length, userData.followers, userData.biography]);

    const getUserByUsername = async (username) => {
        try {
            const user = await userByUsername(userData.authToken, username)
            return user;
        } catch (error) {
            throw new Error(`Error obteniendo datos del ususario ${error.message}`);
        }
    }

    const getUserJoinedActivities = async (user_id) => {
        try {
            const response = await joinedActivities(user_id ,userData.authToken)
            return response;
        } catch (error) {
            throw new Error(`Error obteniendo datos del ususario ${error.message}`);
        }
    }

    return { getUserByUsername, getUserJoinedActivities, setProfileData, profileData, userSince }
}