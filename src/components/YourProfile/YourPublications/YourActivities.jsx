import { ProfileActivityCardSkeleton } from "../../skeletons/ProfileActivityCardSkeleton";
import { useSportsStore } from "../../../store/sports";
import { Suspense, lazy } from "react";
import { useUserActivitiesStore } from "../../../store/userActivities";

const NoPublications = lazy(() => import("./NoPublications"));
const ActivityCard = lazy(() => import("../../cards/ActivityCard"));

export function YourActivities() {
  const sports = useSportsStore((state) => state.sports);
  const yourActivities = useUserActivitiesStore(
    (state) => state.yourActivities
  );

  return (
    <main className="w-full flex">
      {yourActivities && sports ? (
        yourActivities.length === 0 ? (
          <Suspense>
            <NoPublications type={"actividades"} />
          </Suspense>
        ) : (
          <ul className="grid grid-cols-user-activities gap-[1rem] items-center w-full">
            {yourActivities?.map((activity) => {
              return (
                <li key={activity.id}>
                  <Suspense fallback={<div>...</div>}>
                    <ActivityCard
                      isCurrentUserProfile={true}
                      activityData={activity}
                      sports={sports}
                    />
                  </Suspense>
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
