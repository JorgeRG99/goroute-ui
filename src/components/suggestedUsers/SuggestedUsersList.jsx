import { FollowActionCard } from "../cards/FollowActionCard";
import { Divider } from "@nextui-org/react";
import { COPYRIGHT } from "../../../config";
import PropTypes from "prop-types";
import { useSuggestedUsersList } from "../../hooks/useSuggestedUsersList";

export function SuggestedUsersList({ type }) {
  const { usersList } = useSuggestedUsersList(type);

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
                  <FollowActionCard user={user} />
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <Divider className="my-[.9em] mx-auto w-[90%]" />
      <p className="text-[.8em] text-center w-full block text-default-light">
        {COPYRIGHT}
      </p>
    </section>
  );
}

SuggestedUsersList.propTypes = {
  type: PropTypes.string.isRequired,
};
