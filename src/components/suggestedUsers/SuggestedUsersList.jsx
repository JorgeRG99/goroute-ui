import { suggestedUsers } from "../../services/activity";
import { FollowActionCard } from "../cards/FollowActionCard";
import { useUserSessionStore } from "../../store/userSession";
import { useEffect, useState } from "react";
import { Divider } from "@nextui-org/react";
import { COPYRIGHT } from "../../../config";
import PropTypes from "prop-types";

export function SuggestedUsersList({ type }) {
  const authToken = useUserSessionStore((state) => state.authToken);
  const [usersList, setUserList] = useState(null);

  useEffect(() => {
    const getSuggestedUsers = async () => {
      try {
        const users = await suggestedUsers(authToken, type);
        setUserList(users);
      } catch (error) {
        console.error("Error fetching suggested users:", error);
      }
    };

    getSuggestedUsers();
  }, []);

  return (
    <section className="w-[20em] sticky top-[5em] h-[20em] z-40">
      <h2 className={`font-bold text-[1.1em] mb-[1em]`}>
        Ultimos usuarios publicando
      </h2>
      <div className="w-full flex flex-col items-center">
        {!usersList || usersList.length === 0 ? (
          <p>{"Sin usuarios sugeridos :("}</p>
        ) : (
          <ul className="flex flex-col gap-[1em] w-full items-start">
            {usersList.map((user) => {
              return (
                <li
                  className="w-full flex justify-between items-center"
                  key={user.id}
                >
                  <FollowActionCard user={user} />;
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <Divider className="my-[.9em] mx-auto w-[90%]" />
      <span className="text-[.8em] text-center w-full block text-default-light">
        {COPYRIGHT}
      </span>
    </section>
  );
}

SuggestedUsersList.propTypes = {
  type: PropTypes.string.isRequired,
};
