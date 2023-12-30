import { useEffect, useState } from "react";
import { useUserSessionStore } from "../store/userSession";

export function useActivityParticipants(participants) {
    const userData = useUserSessionStore((state) => state.userData);
    const [activityParticipants, setActivityParticipants] = useState(participants)
    const [isJoined, setIsJoined] = useState(
        participants.some((user) => user.id === userData.id)
    );

    useEffect(() => {
        const joinUpdate = activityParticipants.some((user) => user.id === userData.id)
        setIsJoined(joinUpdate);
        
    }, [activityParticipants.length]);

    return { isJoined, activityParticipants, setActivityParticipants }
}