import { useEffect, useState } from "react";
import { getActivitiesFeed } from "../../services/activity";
import { FeedActivityCardSkeleton } from "../skeletons/FeedActivityCardSkeleton";
import { ActivityCard } from "../cards/ActivityCard";
import { useUserSessionStore } from "../../store/userSession";
import { useSportsStore } from "../../store/sports";

export function Activities() {
  const [activitiesFeed, setActtivitiesFeed] = useState(null);
  const authToken = useUserSessionStore((state) => state.authToken);
  const sports = useSportsStore((state) => state.sports);

  useEffect(() => {
    const getUserActivitiesFeed = async () => {
      try {
        const activities = await getActivitiesFeed(authToken);
        setActtivitiesFeed(activities);
      } catch (error) {
        console.error("Error fetching activities feed:", error);
      }
    };

    getUserActivitiesFeed();
  }, []);

  return (
    <div className="w-[50em] mt-[3em]">
      {activitiesFeed && sports ? (
        <ul className="flex flex-col gap-[2em] w-full items-center">
          {activitiesFeed.map((activity) => {
            return (
              <li className="w-[60%]" key={activity.id}>
                <ActivityCard activityData={activity} sports={sports} />
              </li>
            );
          })}
        </ul>
      ) : (
        <>
          <FeedActivityCardSkeleton />
          <FeedActivityCardSkeleton />
        </>
      )}
    </div>
  );
}
