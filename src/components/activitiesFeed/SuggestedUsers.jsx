import { useContext, useEffect, useState } from "react";
import { suggestedUsers } from "../../services/activity";
import { User } from "@nextui-org/user";
import { Button, Link } from "@nextui-org/react";
import { userInitials } from "../../services/helpers";
import { userFollow, userUnfollow } from "../../services/user";
import { UserContext } from "../../context/user";

export function SuggestedUsers() {
  const { userData, setUserData } = useContext(UserContext);
  const [usersList, setUsersList] = useState(null);

  useEffect(() => {
    const getSuggestedUsersByActivity = async () => {
      try {
        const users = await suggestedUsers(userData.authToken);
        setUsersList(users);
      } catch (error) {
        console.error("Error fetching suggested users:", error);
      }
    };

    getSuggestedUsersByActivity();
  }, []);

  return (
    <section className="w-[20em] sticky top-24 h-[20em] z-40">
      <h2 className={`font-bold text-[1em] mb-[1em]`}>Sugeridos para ti</h2>
      <div className="w-full flex flex-col items-center">
        {!usersList ? (
          <p>no hay na</p>
        ) : (
          <ul className="flex flex-col gap-[.5em] w-full items-start">
            {usersList.map((user) => {
              return (
                <li
                  className="w-full flex justify-between items-center"
                  key={user.id}
                >
                  <User
                    name={`${user.name} ${user.surname}`}
                    description={
                      <Link className="text-primary text-[1.1em]">
                        @{user.username}
                      </Link>
                    }
                    avatarProps={{
                      src: user.avatar || undefined,
                      name: userInitials(user.name, user.surname),
                      isBordered: true,
                    }}
                  />
                  {userData.follows.length !== 0 &&
                  userData.follows.includes(user.id) ? (
                    <Button
                      variant="light"
                      size="sm"
                      color="secondary"
                      onPress={async () => {
                        userUnfollow(user.id, userData.authToken);

                        userData.follows.splice(
                          userData.follows.indexOf(user.id),
                          1
                        );

                        setUserData((prev) => ({
                          ...prev,
                          follows: userData.follows,
                        }));
                      }}
                    >
                      Seguido
                    </Button>
                  ) : (
                    <Button
                      variant="flat"
                      size="sm"
                      color="secondary"
                      onPress={async () => {
                        userFollow(user.id, userData.authToken);

                        userData.follows.push(user.id);

                        setUserData((prev) => ({
                          ...prev,
                          follows: userData.follows,
                        }));
                      }}
                    >
                      Seguir
                    </Button>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
