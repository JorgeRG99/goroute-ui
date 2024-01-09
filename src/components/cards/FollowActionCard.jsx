import { User } from "@nextui-org/user";
import { userInitials } from "../../services/helpers";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Suspense, lazy } from "react";

const ToggleFollowButton = lazy(() => import("../buttons/ToggleFollowButton"));

export function FollowActionCard({ user, isCurrentUserProfile }) {
  const { id, name, surname, username, avatar } = user;

  return (
    <div className="flex items-center justify-between w-full">
      <Link
        to={isCurrentUserProfile ? "/profile" : `/${username}`}
        className="flex items-center justify-center"
      >
        <User
          classNames={{ name: "capitalize" }}
          name={`${name} ${surname}`}
          description={<p className="text-primary text-[1.1em]">@{username}</p>}
          avatarProps={{
            src: avatar || undefined,
            name: userInitials(name, surname),
            isBordered: true,
          }}
        />
      </Link>
      <Suspense>
        <ToggleFollowButton id={id} />
      </Suspense>
    </div>
  );
}

FollowActionCard.propTypes = {
  user: PropTypes.object.isRequired,
  isCurrentUserProfile: PropTypes.bool,
};
