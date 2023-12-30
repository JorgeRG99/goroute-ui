import { suggestedUsers } from "../../services/activity";
import { FollowActionCard } from "../cards/FollowActionCard";
import { useUserSessionStore } from "../../store/userSession";
import { useEffect, useState } from "react";
import { Divider } from "@nextui-org/react";
import { COPYRIGHT } from "../../../config";

export function SuggestedUsersList() {
  const authToken = useUserSessionStore((state) => state.authToken);
  const [usersList, setUserList] = useState(null);

  useEffect(() => {
    const getSuggestedUsersByActivity = async () => {
      try {
        const users = await suggestedUsers(authToken);
        setUserList(users);
      } catch (error) {
        console.error("Error fetching suggested users:", error);
      }
    };

    getSuggestedUsersByActivity();
  }, []);

  return (
    <section className="w-[20em] sticky top-[5em] h-[20em] z-40">
      <h2 className={`font-bold text-[1.1em] mb-[1em]`}>
        Ultimos usuarios publicando
      </h2>
      <div className="w-full flex flex-col items-center">
        {!usersList ? (
          <p>no hay na</p>
        ) : (
          <ul className="flex flex-col gap-[1em] w-full items-start">
            {usersList.map((user) => {
              return (
                <FollowActionCard
                  key={user.id}
                  name={user.name}
                  surname={user.surname}
                  username={user.username}
                  id={user.id}
                  avatar={user.avatar}
                />
              );
            })}
          </ul>
        )}
      </div>
      <Divider className="my-[.9em] mx-auto w-[90%]" />
      <span className="text-[.8em] text-center w-full block text-default">
        {COPYRIGHT}
      </span>
    </section>
  );
}
