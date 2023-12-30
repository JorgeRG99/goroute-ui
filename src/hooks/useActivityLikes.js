import { useEffect, useState } from "react";
import { likeActivity, unlikeActivity } from "../services/activity";
import { useUserSessionStore } from "../store/userSession";

export function useActivityLikes(activity) {
    const [activityLikesList, setActivityLikesList] = useState(activity.likes);
    const [isLiked, setIsLiked] = useState(false);
    const userData = useUserSessionStore((state) => state.userData);
    const authToken = useUserSessionStore((state) => state.authToken);
  
    useEffect(() => {
        const likeCheck = activityLikesList.some(
          (user) => user.id === userData.id
        );
  
        setIsLiked(likeCheck);

    }, [activityLikesList.length]);
  
    const handleLikeStatus = async () => {
      if (!isLiked) {
        await likeActivity(authToken, activity.id);
  
        const updatedLikesList = [...activityLikesList];
        updatedLikesList.push(userData);
  
        setActivityLikesList(updatedLikesList);
      } else {
        await unlikeActivity(authToken, activity.id);
  
        const updatedLikesList = activityLikesList.filter(
          (user) => user.id !== userData.id
        );
        
        setActivityLikesList(updatedLikesList);
      }
    };

    return { activityLikesList, isLiked, handleLikeStatus }
}