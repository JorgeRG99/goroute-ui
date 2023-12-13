import { useContext, useEffect, useState } from "react";
import { getActivitiesFeed } from "../../services/activity";
import { FeedActivityCardSkeleton } from "../skeletons/FeedActivityCardSkeleton";
import { FeedActivityCard } from "../cards/FeedActivityCard";
import { UserContext } from "../../context/user";

export function Activities() {
  const [activitiesFeed, setActtivitiesFeed] = useState(null);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    const getUserActivitiesFeed = async () => {
      try {
        const activities = await getActivitiesFeed(userData.authToken);
        setActtivitiesFeed(activities);
      } catch (error) {
        console.error("Error fetching activities feed:", error);
      }
    };

    getUserActivitiesFeed();
  }, []);

  return (
    <div className="w-[50em] mt-[3em]">
      {!activitiesFeed ? (
        <div>
          <FeedActivityCardSkeleton />
          <FeedActivityCardSkeleton />
        </div>
      ) : (
        <ul className="flex flex-col gap-[2em] w-full items-center">
          {activitiesFeed.map((activity) => {
            return (
              <li className="w-[60%]" key={activity.id}>
                <FeedActivityCard activityData={activity} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
