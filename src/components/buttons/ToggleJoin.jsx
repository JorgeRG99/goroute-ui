import { Button } from "@nextui-org/react";
import PropTypes from "prop-types";
import { addParticipant, removeParticipant } from "../../services/activity";
import { useUserSessionStore } from "../../store/userSession";

export function ToggleJoin({
  participants,
  setParticipants,
  isJoined,
  activityId,
  isComplete,
}) {
  const userData = useUserSessionStore((state) => state.userData);
  const authToken = useUserSessionStore((state) => state.authToken);

  const handleJoinStatus = async () => {
    if (!isJoined) {
      await addParticipant(authToken, activityId);

      const updatedActivityParticipants = [...participants];

      updatedActivityParticipants.push(userData);

      setParticipants(updatedActivityParticipants);
    } else {
      await removeParticipant(authToken, activityId, userData.id);

      const updatedParticipants = participants.filter(
        (user) => user.id !== userData.id
      );

      setParticipants(updatedParticipants);
    }
  };

  return (
    <Button
      color={!isJoined ? (isComplete ? "warning" : "primary") : "danger"}
      onPress={handleJoinStatus}
      variant={isJoined ? "flat" : isComplete ? "solid" : "flat"}
      isDisabled={isComplete && !isJoined ? true : false}
    >
      {!isJoined ? (isComplete ? "Completa" : "Únete!") : "Abandonar"}
    </Button>
  );
}

ToggleJoin.propTypes = {
  activityId: PropTypes.string.isRequired,
  participants: PropTypes.array.isRequired,
  setParticipants: PropTypes.func.isRequired,
  isJoined: PropTypes.bool.isRequired,
  isComplete: PropTypes.bool.isRequired,
};
