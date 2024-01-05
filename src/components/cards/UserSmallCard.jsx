import { User } from "@nextui-org/user";
import { Link } from "react-router-dom";
import { userInitials } from "../../services/helpers";
import PropTypes from "prop-types";
import { useUserSessionStore } from "../../store/userSession";

export default function UserSmallCard({ user }) {
  const { username, name, surname, avatar } = user;
  const userData = useUserSessionStore((state) => state.userData);

  const userProfileUrl =
    userData.username === username ? "/profile" : `/${username}`;

  return (
    <Link to={userProfileUrl}>
      <User
        classNames={{ name: "capitalize", base: "ml-[.5em] py-[.2em]" }}
        name={`${name} ${surname}`}
        description={<p className="text-primary text-[1.1em]">@{username}</p>}
        avatarProps={{
          src: avatar || undefined,
          name: userInitials(name, surname),
          isBordered: true,
          size: "sm",
        }}
      />
    </Link>
  );
}

UserSmallCard.propTypes = {
  user: PropTypes.object.isRequired,
};
