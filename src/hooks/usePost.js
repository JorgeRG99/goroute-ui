import { useEffect, useState } from "react";
import { useUserSessionStore } from "../store/userSession";
import { getUserPosts } from "../services/post";

export function usePost(username) {
    const authToken = useUserSessionStore(state => state.authToken);
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        const getPostsByUser = async () => {
            const activities = await getUserPosts(authToken, username);

            setUserPosts(activities);
        };

        getPostsByUser();
    }, [username, userPosts.length]);

    return { userPosts }
}