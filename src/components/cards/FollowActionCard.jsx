import { User } from "@nextui-org/user";
import { userInitials } from "../../services/helpers";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Suspense, lazy } from "react";

const ToggleFollowButton = lazy(() => import("../buttons/ToggleFollowButton"));

export function FollowActionCard({ user }) {
  const { id, name, surname, username, avatar } = user;
  return (
    <>
      <Link to={`/${username}`}>
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
    </>
  );
}

FollowActionCard.propTypes = {
  user: PropTypes.object.isRequired,
};
