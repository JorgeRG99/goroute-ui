import { User } from "@nextui-org/user";
import { Link } from "react-router-dom";
import { userInitials } from "../../services/helpers";
import PropTypes from "prop-types";
import { RemoveFollower } from "../buttons/RemoveFollower";

export function FollowersCard({ user, onClose }) {
  const { id, name, surname, username, avatar } = user;

  return (
    <span className="w-full flex justify-between items-center">
      <Link onClick={onClose} to={`/${username}`}>
        <User
          name={`${name} ${surname}`}
          description={<p className="text-primary text-[1.1em]">@{username}</p>}
          avatarProps={{
            src: avatar || undefined,
            name: userInitials(name, surname),
            isBordered: true,
          }}
        />
      </Link>
      <RemoveFollower id={id} />
    </span>
  );
}

FollowersCard.propTypes = {
  user: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};
