import { useUserSessionStore } from "../../store/userSession";
import { chatWith } from "../../services/chat";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Chat } from "../icons/Chat";

export function OpenChat({ userProfileId, username }) {
  const authToken = useUserSessionStore((state) => state.authToken);
  const handleChatPress = async () => await chatWith(authToken, userProfileId);

  return (
    <Link
      to={`/messages/${username}`}
      className=" h-[2rem] rounded-lg bg-tertiary px-[.5em] py-[1.25em] text-white text-[.9em] flex items-center hover:opacity-75 transition duration-300 ease-in-out"
      onClick={handleChatPress}
    >
      <Chat color="white" />
    </Link>
  );
}

OpenChat.propTypes = {
  userProfileId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};
