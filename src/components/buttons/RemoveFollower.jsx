import { Button } from "@nextui-org/react";
import { removeFollower } from "../../services/user";
import PropTypes from "prop-types";
import { useState } from "react";
import { useUserSessionStore } from "../../store/userSession";

export function RemoveFollower({ id }) {
  const [isRemoved, setIsRemoved] = useState(false);
  const userData = useUserSessionStore((state) => state.userData);
  const authToken = useUserSessionStore((state) => state.authToken);
  const updateUserData = useUserSessionStore((state) => state.updateUserData);

  return (
    <>
      {isRemoved ? (
        <Button isDisabled size="sm" variant="light" color="danger">
          Eliminado
        </Button>
      ) : (
        <Button
          onPress={() => {
            removeFollower(id, authToken);

            const updatedFollowers = userData.followers.filter(
              (follower) => follower !== id
            );

            updateUserData({
              followers: updatedFollowers,
            });

            setIsRemoved(true);
          }}
          size="sm"
          color="danger"
          variant="flat"
        >
          Eliminar
        </Button>
      )}
    </>
  );
}
RemoveFollower.propTypes = {
  id: PropTypes.string.isRequired,
};
