import { lazy, useEffect, useState } from "react";
import { getActivitiesFeed } from "../../services/activity";
import { FeedActivityCardSkeleton } from "../skeletons/FeedActivityCardSkeleton";
import { useUserSessionStore } from "../../store/userSession";
import { useSportsStore } from "../../store/sports";
import { Link } from "react-router-dom";

const ActivityCard = lazy(() => import("../cards/ActivityCard"));

export function Activities() {
  const [activitiesFeed, setActivitiesFeed] = useState(null);
  const authToken = useUserSessionStore((state) => state.authToken);
  const sports = useSportsStore((state) => state.sports);

  useEffect(() => {
    const getUserActivitiesFeed = async () => {
      try {
        const activities = await getActivitiesFeed(authToken);
        setActivitiesFeed(activities);
      } catch (error) {
        console.error("Error fetching activities feed:", error);
      }
    };

    getUserActivitiesFeed();
  }, []);

  return (
    <div className="w-[50em] my-[3em]">
      {activitiesFeed && sports ? (
        activitiesFeed > 0 ? (
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
          <div className="mt-[5em] mx-auto text-[1.1em] flex flex-col gap-[2em] w-[80%]">
            <p>Lo sentimos, no hay actividades por el momento</p>
            <p>
              Lamentamos informarte que actualmente no hay actividades
              disponibles en nuestro muro. Estamos trabajando activamente para
              resolver este inconveniente.
            </p>
            <p>
              Te invitamos a explorar nuestra sección de{" "}
              <span className="text-tertiary">Publicaciones</span> donde podrás
              encontrar una variedad de opciones interesantes y divertidas para
              ti.
            </p>
            <Link className="mx-auto mt-[2em]" to="/posts">
              <span
                className="text-[.9em] text-tertiary-dark bg-tertiary-blurred py-[.7em] px-[.8em] rounded-lg hover:opacity-75 transition duration-300 ease-in-out"
                size="sm"
              >
                Ver publicaciones
              </span>
            </Link>
          </div>
        )
      ) : (
        <>
          <FeedActivityCardSkeleton />
          <FeedActivityCardSkeleton />
        </>
      )}
    </div>
  );
}
