import { ProfileActivityCardSkeleton } from "../skeletons/ProfileActivityCardSkeleton";
import PropTypes from "prop-types";
import { ActivityCard } from "../cards/ActivityCard";
import { useSportsStore } from "../../store/sports";
import { Suspense, lazy } from "react";

const NoPublications = lazy(() => import("./NoPublications"));

export function YourActivities({ userActivities }) {
  const sports = useSportsStore((state) => state.sports);

  return (
    <main className="w-full flex">
      {userActivities && sports ? (
        userActivities.length === 0 ? (
          <Suspense fallback={<div>...</div>}>
            <NoPublications type={"actividades"} />
          </Suspense>
        ) : (
          <ul className="grid grid-cols-user-activities gap-[1rem] items-center w-full">
            {userActivities?.map((activity) => {
              return (
                <li key={activity.id}>
                  <ActivityCard
                    isCurrentUserProfile={true}
                    activityData={activity}
                    sports={sports}
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
YourActivities.propTypes = {
  userActivities: PropTypes.array,
};
