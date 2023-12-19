import { useContext } from "react";
import { UserContext } from "../../context/user";
import { Button } from "@nextui-org/react";
import { userFollow, userUnfollow } from "../../services/user";
import PropTypes from "prop-types";

export function ToggleFollowButton({ id }) {
  const { userData, setUserData } = useContext(UserContext);

  return (
    <Button
      variant="light"
      size="sm"
      color="secondary"
      onPress={async () => {
        if (userData.follows.includes(id)) {
          await userUnfollow(id, userData.authToken);
          userData.follows.splice(userData.follows.indexOf(id), 1);
        } else {
          await userFollow(id, userData.authToken);
          userData.follows.push(id);
        }

        setUserData((prev) => ({
          ...prev,
          follows: userData.follows,
        }));
      }}
    >
      {userData.follows.includes(id) ? "Seguido" : "Seguir"}
    </Button>
  );
}

ToggleFollowButton.propTypes = {
  id: PropTypes.string.isRequired,
};
