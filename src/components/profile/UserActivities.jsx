import { ProfileActivityCardSkeleton } from "../skeletons/ProfileActivityCardSkeleton";
import PropTypes from "prop-types";
import { ActivityCard } from "../cards/ActivityCard";
import { useParams } from "react-router-dom";
import { useUserSessionStore } from "../../store/userSession";
import { useSportsStore } from "../../store/sports";
import { Suspense, lazy } from "react";

const NoPublications = lazy(() => import("./NoPublications"));

export function UserActivities({ userActivities, editActivity }) {
  const sports = useSportsStore((state) => state.sports);
  const { username } = useParams();
  const userData = useUserSessionStore((state) => state.userData);
  const isCurrentUserProfile = userData.username === username;

  return (
    <main className="w-full flex">
      {userActivities && sports ? (
        userActivities.length === 0 ? (
          <Suspense fallback={<div>...</div>}>
            <NoPublications
              type={"actividades"}
              isCurrentUserProfile={isCurrentUserProfile}
              username={username}
            />
          </Suspense>
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
