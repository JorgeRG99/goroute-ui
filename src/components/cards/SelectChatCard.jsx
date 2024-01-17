import PropTypes from "prop-types";
import { userInitials } from "../../services/helpers";
import { Avatar } from "@nextui-org/react";

export function SelectChatCard({ user, lastMessage }) {
  const { username, name, surname, avatar } = user;

  return (
    <div className="flex gap-[.7em] items-center">
      <Avatar
        isBordered
        src={avatar || `https://i.pravatar.cc/${300}`}
        name={avatar || userInitials(name, surname)}
      />
      <div className="flex flex-col items-start justify-start">
        <p>{username}</p>
        {lastMessage && (
          <p className="text-tertiary text-[.85em]">{lastMessage.content}</p>
        )}
      </div>
    </div>
  );
}

SelectChatCard.propTypes = {
  user: PropTypes.object.isRequired,
  lastMessage: PropTypes.object,
};
