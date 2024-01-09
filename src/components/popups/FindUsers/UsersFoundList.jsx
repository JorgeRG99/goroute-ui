import PropTypes from "prop-types";
import { FollowActionCard } from "../../Cards/FollowActionCard";
import { useUserSessionStore } from "../../../store/userSession";

export function UsersFoundList({ foundedUsersList, onClose }) {
  const userData = useUserSessionStore((state) => state.userData);

  return (
    <div className="overflow-scroll w-full flex flex-col items-center pt-[.5em]">
      {foundedUsersList && foundedUsersList.length > 0 ? (
        <ul className="h-full w-[95%] flex flex-col">
          {foundedUsersList.map((user) => (
            <li
              onClick={onClose}
              key={user.username}
              className="w-full flex justify-between items-center hover:bg-gray-100 transition duration-300 ease-in-out py-[.7em] pr-[.5em] pl-[1em] rounded-lg"
            >
              <FollowActionCard
                user={user}
                isCurrentUserProfile={user.username === userData.username}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center mt-[3em] text-[1.1em] font-light">
          {"No se han encontrado usuarios :("}
        </p>
      )}
    </div>
  );
}

UsersFoundList.propTypes = {
  foundedUsersList: PropTypes.array,
  onClose: PropTypes.func.isRequired,
};
