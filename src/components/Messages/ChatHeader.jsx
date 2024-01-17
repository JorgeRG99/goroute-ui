import { Avatar } from "@nextui-org/react";
import { userInitials } from "../../services/helpers";
import PropTypes from "prop-types";

export function ChatHeader({ userChat }) {
  const { avatar, username, name, surname } = userChat;

  return (
    <div className="h-[12%] bg-[#f7f9ff] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-2xl w-[35em] m-auto flex items-start gap-[1em] px-[1em] py-[1em]">
      <Avatar
        isBordered
        src={avatar || `https://i.pravatar.cc/${300}`}
        name={avatar || userInitials(name, surname)}
      />
      <div className="flex flex-col">
        <p className="font-medium text-tertiary">{username}</p>
      </div>
    </div>
  );
}

ChatHeader.propTypes = {
  userChat: PropTypes.object.isRequired,
};
