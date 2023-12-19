import { User } from "@nextui-org/user";
import { Link } from "react-router-dom";
import { userInitials } from "../../services/helpers";
import PropTypes from "prop-types";
import { RemoveFollower } from "../buttons/RemoveFollower";

export function FollowersCard({
  id,
  name,
  surname,
  username,
  avatar,
  onClose,
}) {
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
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};
