import { Button } from "@nextui-org/react";
import { useState } from "react";
import { useUserSessionStore } from "../../store/userSession";
import { removeParticipant } from "../../services/activity";
import PropTypes from "prop-types";

export function RemoveParticipant({
  userId,
  activityId,
  participants,
  setParticipants,
}) {
  const [isRemoved, setIsRemoved] = useState(false);
  const authToken = useUserSessionStore((state) => state.authToken);

  return (
    <>
      {isRemoved ? (
        <Button isDisabled size="sm" variant="light" color="danger">
          Eliminado
        </Button>
      ) : (
        <Button
          onPress={async () => {
            await removeParticipant(authToken, activityId, userId);

            const updatedParticipants = participants.filter(
              (user) => user.id !== userId
            );

            setParticipants(updatedParticipants);
            setIsRemoved(true);
          }}
          size="sm"
          color="danger"
          variant="light"
        >
          Eliminar
        </Button>
      )}
    </>
  );
}
RemoveParticipant.propTypes = {
  userId: PropTypes.string.isRequired,
  activityId: PropTypes.string.isRequired,
  participants: PropTypes.array.isRequired,
  setParticipants: PropTypes.func.isRequired,
};
