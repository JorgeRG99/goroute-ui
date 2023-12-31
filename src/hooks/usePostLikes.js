import { useEffect, useState } from "react";
import { useUserSessionStore } from "../store/userSession";
import { likePost, unlikePost } from "../services/post";

export function usePostLikes(post) {
    const [postLikesList, setPostLikesList] = useState(post.likes);
    const [isLiked, setIsLiked] = useState(false);
    const userData = useUserSessionStore((state) => state.userData);
    const authToken = useUserSessionStore((state) => state.authToken);
  
    useEffect(() => {
        
        const likeCheck = postLikesList.some(
            (user) => user.id === userData.id
          );
    
        setIsLiked(likeCheck);

    }, [postLikesList.length]);
  
    const handleLikeStatus = async () => {
      if (!isLiked) {
        await likePost(authToken, post.id);
  
        const updatedLikesList = [...postLikesList];
        updatedLikesList.push(userData);
  
        setPostLikesList(updatedLikesList);
      } else {
        await unlikePost(authToken, post.id);
  
        const updatedLikesList = postLikesList.filter(
          (user) => user.id !== userData.id
        );
        
        setPostLikesList(updatedLikesList);
      }
    };

    return { postLikesList, isLiked, handleLikeStatus }
}