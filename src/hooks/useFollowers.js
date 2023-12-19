import { useContext, useEffect, useState } from "react";
import { getUserById } from "../services/user";
import { UserContext } from "../context/user";

export const useFollowers = ({ followersList }) => {
    const { userData } = useContext(UserContext);
    const [followersDataList, setFollowersDataList] = useState(null)

    useEffect(() => {
        const getFollowersDataList = async () => {
            let list  = []
    
            for (const follower of followersList) {
                const userData = await userById(follower);
                list.push(userData);
            }
    
            setFollowersDataList(list)
        }

        getFollowersDataList()
      }, [])

    const userById = async (id) => {
        try {
            const user = await getUserById(userData.authToken, id)
            return user;
        } catch (error) {
            throw new Error(`Error obteniendo datos del ususario ${error.message}`);
        }
    }

    

    return { followersDataList }
}