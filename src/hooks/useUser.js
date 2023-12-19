import { useContext, useEffect, useState } from "react"
import { userByUsername, userFollowers, userFollows } from "../services/user"
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
            const follows = await getUserFollows()
            const followers = await getUserFollowers()

            setProfileData({
                ...user,
                follows: follows,
                followers: followers
            });

            const year = user.created_at.slice(0, 4);
            const month = user.created_at.slice(5, 7);

            setUserSince(getUserCreationDate(year, month));
        };

        getProfileData();
    }, [username, userData.follows, userData.followers]);

    const getUserByUsername = async (username) => {
        try {
            const user = await userByUsername(userData.authToken, username)
            return user;
        } catch (error) {
            throw new Error(`Error obteniendo datos del ususario ${error.message}`);
        }
    }

    const getUserFollows = async () => {
        try {
            const follows = await userFollows(userData.authToken)
            return follows;
        } catch (error) {
            throw new Error(`Error obteniendo datos del ususario ${error.message}`);
        }
    }

    const getUserFollowers = async () => {
        try {
            const followers = await userFollowers(userData.authToken)
            return followers;
        } catch (error) {
            throw new Error(`Error obteniendo datos del ususario ${error.message}`);
        }
    }

    return { getUserByUsername, getUserFollows, profileData, userSince }
}