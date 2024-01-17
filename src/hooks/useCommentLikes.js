import { useEffect, useState } from "react";
import { useUserSessionStore } from "../store/userSession";
import { likeComment, unlikeComment } from "../services/comment";

export function useCommentLikes(comment) {
    const [commentLikesList, setCommentLikesList] = useState(comment.likes);
    const [isLiked, setIsLiked] = useState(false);
    const userData = useUserSessionStore((state) => state.userData);
    const authToken = useUserSessionStore((state) => state.authToken);

    useEffect(() => {
        const likeCheck = commentLikesList.some(
            (user) => user.id === userData.id
        );

        setIsLiked(likeCheck);

    }, [commentLikesList.length]);

    const handleLikeStatus = async () => {
        if (!isLiked) {
            await likeComment(authToken, comment.id);

            setCommentLikesList(prevState => {
                [
                    ...prevState,
                    userData
                ]
            });
        } else {
            await unlikeComment(authToken, comment.id);

            setCommentLikesList(prevState => prevState.filter(
                (user) => user.id !== userData.id
            ));
        }
    };

    return { commentLikesList, isLiked, handleLikeStatus }
}