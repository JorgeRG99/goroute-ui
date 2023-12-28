import { Button } from "@nextui-org/react";
import { userFollow, userUnfollow } from "../../services/user";
import PropTypes from "prop-types";
import { useUserSessionStore } from "../../store/userSession";

export default function ToggleFollowButton({ id }) {
  const userData = useUserSessionStore((state) => state.userData);
  const authToken = useUserSessionStore((state) => state.authToken);
  const updateUserData = useUserSessionStore((state) => state.updateUserData);
  const isFollowing = userData.follows.some((user) => user.id === id);

  const toggleFollowStatus = async () => {
    let updatedFollows = userData.follows;

    if (isFollowing) {
      const userUnfollowed = await userUnfollow(id, authToken);

      updatedFollows = userData.follows.filter(
        (user) => user.id !== userUnfollowed.id
      );
    } else {
      const userFollowed = await userFollow(id, authToken);
      updatedFollows.push(userFollowed);
    }

    updateUserData({
      follows: updatedFollows,
    });
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
