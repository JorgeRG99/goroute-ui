import { Button } from "@nextui-org/react";
import PropTypes from "prop-types";
import { useContext } from "react";
import { UserContext } from "../../context/user";
import { addParticipant, removeParticipant } from "../../services/activity";

export function ToggleJoin({ activityId, participants, setParticipants }) {
  const { userData } = useContext(UserContext);
  const isJoined = participants.some((user) => user.id === userData.id);

  const handleJoinStatus = async () => {
    if (!isJoined) {
      await addParticipant(userData.authToken, activityId);

      const updatedParticipants = [...participants];
      updatedParticipants.push(userData);

      setParticipants(updatedParticipants);
    } else {
      await removeParticipant(userData.authToken, activityId);

      const updatedParticipants = participants.filter(
        (user) => user.id !== userData.id
      );

      setParticipants(updatedParticipants);
    }
  };

  return (
    <Button
      color={!isJoined ? "primary" : "danger"}
      onPress={handleJoinStatus}
      variant="flat"
    >
      {!isJoined ? "Únete!" : "Abandonar"}
    </Button>
  );
}

ToggleJoin.propTypes = {
  activityId: PropTypes.string.isRequired,
  participants: PropTypes.array.isRequired,
  setParticipants: PropTypes.func.isRequired,
};
