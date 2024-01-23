import PropTypes from "prop-types";
import { useUserSessionStore } from "../../store/userSession";
import { Avatar } from "@nextui-org/react";
import { userInitials } from "../../services/helpers";

export function ChatMessageCard({ messageData }) {
  const { user, content } = messageData;
  const userData = useUserSessionStore((state) => state.userData);

  const messageContentAlignClasses =
    userData.username === user.username
      ? "rounded-tl-lg bg-tertiary"
      : "rounded-tr-lg bg-white";

  const messageContainerAlignClasses =
    userData.username === user.username ? "ml-auto flex-row-reverse" : "";

  const messageTextColorClasses =
    userData.username === user.username ? "text-white" : "text-gray-600";

  return (
    <div
      className={`max-w-[80%] flex items-start gap-[.5em] px-[0.3em] ${messageContainerAlignClasses}`}
    >
      <Avatar
        src={user.avatar || `https://i.pravatar.cc/${300}`}
        name={user.avatar || userInitials(user.name, user.surname)}
        size="sm"
        isBordered
      />
      <div
        className={`rounded-b-lg p-[.5em] max-w-[70%] text-[.85em] ${messageContentAlignClasses} flex flex-col gap-[.5em]`}
      >
        {content.map((paragraph) => (
          <p
            className={`${messageTextColorClasses} break-words`}
            key={crypto.randomUUID()}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}

ChatMessageCard.propTypes = {
  messageData: PropTypes.object.isRequired,
};
