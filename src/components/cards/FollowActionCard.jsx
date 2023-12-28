import { User } from "@nextui-org/user";
import { userInitials } from "../../services/helpers";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Suspense, lazy } from "react";

const ToggleFollowButton = lazy(() => import("../buttons/ToggleFollowButton"));

export function FollowActionCard({ id, name, surname, username, avatar }) {
  return (
    <li className="w-full flex justify-between items-center" key={id}>
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
    </li>
  );
}

FollowActionCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string,
};
