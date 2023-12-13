import { useContext, useEffect, useState } from "react";
import { suggestedUsers } from "../../services/activity";
import { UserContext } from "../../context/user";
import { SuggestedUser } from "./SuggestedUser";

export function SuggestedUsersList() {
  const { userData } = useContext(UserContext);
  const [usersList, setUserList] = useState(null);

  useEffect(() => {
    const getSuggestedUsersByActivity = async () => {
      try {
        const users = await suggestedUsers(userData.authToken);
        setUserList(users);
      } catch (error) {
        console.error("Error fetching suggested users:", error);
      }
    };

    getSuggestedUsersByActivity();
  }, []);

  return (
    <section className="w-[20em] sticky top-[3em] h-[20em] z-40">
      <h2 className={`font-bold text-[1em] mb-[1em]`}>Usuarios activos</h2>
      <div className="w-full flex flex-col items-center">
        {!usersList ? (
          <p>no hay na</p>
        ) : (
          <ul className="flex flex-col gap-[.5em] w-full items-start">
            {usersList.map((user) => {
              return (
                <SuggestedUser
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
    </section>
  );
}
