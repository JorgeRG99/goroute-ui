import { useContext } from "react";
import { UserContext } from "../../context/user";
import { Button } from "@nextui-org/react";
import { userFollow, userUnfollow } from "../../services/user";
import PropTypes from "prop-types";

export function ToggleFollowButton({ id }) {
  const { userData, setUserData } = useContext(UserContext);
  const isFollowing = userData.follows.some((user) => user.id === id);

  const toggleFollowStatus = async () => {
    let updatedFollows = userData.follows;

    if (isFollowing) {
      const userUnfollowed = await userUnfollow(id, userData.authToken);

      updatedFollows = userData.follows.filter(
        (user) => user.id !== userUnfollowed.id
      );
    } else {
      const userFollowed = await userFollow(id, userData.authToken);
      updatedFollows.push(userFollowed);
    }

    setUserData((prev) => ({
      ...prev,
      follows: updatedFollows,
    }));
  };

  return (
    <Button
      variant="light"
      size="sm"
      color="secondary"
      onPress={toggleFollowStatus}
    >
      {isFollowing ? "Seguido" : "Seguir"}
    </Button>
  );
}

ToggleFollowButton.propTypes = {
  id: PropTypes.string.isRequired,
};
