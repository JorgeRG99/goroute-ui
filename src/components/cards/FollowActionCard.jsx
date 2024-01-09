import PropTypes from "prop-types";
import { Suspense, lazy } from "react";
import UserCard from "./UserCard";
import { USER_CARD_MEDIUM_SIZE } from "../../../config";

const ToggleFollowButton = lazy(() => import("../buttons/ToggleFollowButton"));

export function FollowActionCard({ user }) {
  return (
    <div className="flex items-center justify-between w-full">
      <UserCard user={user} size={USER_CARD_MEDIUM_SIZE} />
      <Suspense>
        <ToggleFollowButton id={user.id} />
      </Suspense>
    </div>
  );
}

FollowActionCard.propTypes = {
  user: PropTypes.object.isRequired,
};
