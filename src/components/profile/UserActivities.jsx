import { ProfileActivityCardSkeleton } from "../skeletons/ProfileActivityCardSkeleton";
import PropTypes from "prop-types";
import { NoPublications } from "./NoPublications";
import { ActivityCard } from "../cards/ActivityCard";
import { useSports } from "../../hooks/useSports";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/user";

export function UserActivities({ userActivities, editActivity }) {
  const { sports } = useSports();
  const { username } = useParams();
  const { userData } = useContext(UserContext);
  const isCurrentUserProfile = userData.username === username;

  return (
    <main className="w-full flex">
      {userActivities && sports ? (
        userActivities.length === 0 ? (
          <NoPublications
            type={"actividades"}
            isCurrentUserProfile={isCurrentUserProfile}
            username={username}
          />
        ) : (
          <ul className="grid grid-cols-user-activities gap-[1rem] items-center w-full">
            {userActivities.map((activity) => {
              return (
                <li key={activity.id}>
                  <ActivityCard
                    isCurrentUserProfile={isCurrentUserProfile}
                    activityData={activity}
                    sports={sports}
                    editActivity={editActivity}
                  />
                </li>
              );
            })}
          </ul>
        )
      ) : (
        <div className="grid grid-cols-user-activities items-center gap-[1rem] w-full">
          <ProfileActivityCardSkeleton />
          <ProfileActivityCardSkeleton />
          <ProfileActivityCardSkeleton />
          <ProfileActivityCardSkeleton />
          <ProfileActivityCardSkeleton />
          <ProfileActivityCardSkeleton />
        </div>
      )}
    </main>
  );
}
UserActivities.propTypes = {
  userActivities: PropTypes.array,
  editActivity: PropTypes.func,
};
