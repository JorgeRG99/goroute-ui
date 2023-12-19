import { Button } from "@nextui-org/react";
import { removeFollower } from "../../services/user";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { UserContext } from "../../context/user";

export function RemoveFollower({ id }) {
  const [isRemoved, setIsRemoved] = useState(false);
  const { userData, setUserData } = useContext(UserContext);

  return (
    <>
      {isRemoved ? (
        <Button isDisabled size="sm" variant="light" color="danger">
          Eliminado
        </Button>
      ) : (
        <Button
          onPress={() => {
            removeFollower(id, userData.authToken);

            const updatedFollowers = userData.followers.filter(
              (follower) => follower !== id
            );

            setUserData({
              ...userData,
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
