import { useEffect, useState } from "react";
import { useActivity } from "../../hooks/useActivity";
import { ActivityCard } from "../cards/ActivityCard";
import { ActivityCardSkeleton } from "../skeletons/ActivityCardSkeleton";

export function Activities() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { userActivities } = useActivity();

  useEffect(() => {
    if (userActivities.length != 0) setIsLoaded(true);
  }, [userActivities]);

  return (
    <main className="w-full flex justify-end">
      {!isLoaded ? (
        <div className="grid grid-cols-activities gap-[1rem] w-[60%]">
          <ActivityCardSkeleton />
          <ActivityCardSkeleton />
          <ActivityCardSkeleton />
          <ActivityCardSkeleton />
          <ActivityCardSkeleton />
          <ActivityCardSkeleton />
        </div>
      ) : (
        <ul className="grid grid-cols-activities gap-[1rem] w-[60%]">
          {userActivities.map((activity) => {
            return (
              <li key={activity.id}>
                <ActivityCard activityData={activity} />
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
