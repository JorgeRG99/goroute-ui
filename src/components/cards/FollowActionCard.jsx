import { User } from "@nextui-org/user";
import { ToggleFollowButton } from "../buttons/ToggleFollowButton";
import { userInitials } from "../../services/helpers";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

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
      <ToggleFollowButton id={id} />
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
