import { lazy } from "react";
import { getActivitiesFeed } from "../../services/activity";
import { FeedActivityCardSkeleton } from "../skeletons/FeedActivityCardSkeleton";
import { useSportsStore } from "../../store/sports";
import { Link } from "react-router-dom";
import FeedFooter from "../FeedFooter/FeedFooter";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { Spinner } from "@nextui-org/spinner";

const ActivityCard = lazy(() => import("../cards/ActivityCard"));

export function Activities() {
  const { feed, isLoading } = useInfiniteScroll(getActivitiesFeed, "post-feed");
  const sports = useSportsStore((state) => state.sports);

  return (
    <section>
      <main className="w-[50em]" id="post-feed">
        {feed && sports ? (
          feed.length > 0 ? (
            <ul className="flex flex-col gap-[2em] w-full items-center">
              {feed.map((activity) => {
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
                <span className="text-tertiary">Publicaciones</span> donde
                podrás encontrar una variedad de opciones interesantes y
                divertidas para ti.
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
        {isLoading && <Spinner color="primary" />}
      </main>
      <FeedFooter />
    </section>
  );
}
