import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/user";
import { activityParticipants } from "../services/activity";

export function useActivityParticipants(activityId) {
    const { userData } = useContext(UserContext);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const getParticipants = async () => {
      const participants = await activityParticipants(
        userData.authToken,
        activityId
      );

      setParticipants(participants);
    };

    getParticipants();
  }, [participants.length]);

  return { participants, setParticipants }
}