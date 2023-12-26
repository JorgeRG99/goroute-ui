import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/user";
import { activityLikes, likeActivity, unlikeActivity } from "../services/activity";

export function useActivityLikes(activityId) {
    const [activityLikesList, setActivityLikes] = useState([]);
    const [isLiked, setIsLiked] = useState(false);
    const { userData } = useContext(UserContext);
  
    useEffect(() => {
      const getActivityLikes = async () => {
        const likes = await activityLikes(userData.authToken, activityId);
  
        setActivityLikes(likes);
  
        const likeCheck = activityLikesList.some(
          (user) => user.id === userData.id
        );
  
        setIsLiked(likeCheck);
      };
  
      getActivityLikes();
    }, [activityLikesList.length]);
  
    const handleLikeStatus = async () => {
      if (!isLiked) {
        await likeActivity(userData.authToken, activityId);
  
        const updatedLikesList = [...activityLikesList];
        updatedLikesList.push(userData);
  
        setActivityLikes(updatedLikesList);
      } else {
        await unlikeActivity(userData.authToken, activityId);
  
        const updatedLikesList = activityLikesList.filter(
          (user) => user.id !== userData.id
        );
  
        setActivityLikes(updatedLikesList);
      }
    };

    return { activityLikesList, isLiked, handleLikeStatus }
}