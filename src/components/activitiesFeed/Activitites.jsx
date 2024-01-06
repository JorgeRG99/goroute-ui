import { lazy, useRef, useState } from "react";
import { getActivitiesFeed } from "../../services/activity";
import { FeedActivityCardSkeleton } from "../skeletons/FeedActivityCardSkeleton";
import { Link } from "react-router-dom";
import FeedFooter from "../FeedFooter/FeedFooter";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { Spinner } from "@nextui-org/spinner";
import { ActivitiesFeedHeader } from "./ActivitiesFeedHeader";

const ActivityCard = lazy(() => import("../cards/ActivityCard"));

export function Activities() {
  const elementToObserve = useRef(null);
  const [sportFilter, setSportFilter] = useState();
  const [titleFilter, setTitleFilter] = useState();
  const { feed, isLoading } = useInfiniteScroll(
    getActivitiesFeed,
    elementToObserve,
    {
      firstFilter: sportFilter,
      secondFilter: titleFilter,
    }
  );

  return (
    <section className="flex flex-col items-center">
      <ActivitiesFeedHeader
        setSportFilter={setSportFilter}
        setTitleFilter={setTitleFilter}
      />
      <main className="w-[50em] flex flex-col gap-[2em] items-center">
        {feed ? (
          feed.length > 0 ? (
            <ul className="flex flex-col gap-[2em] w-full items-center">
              {feed.map((activity) => {
                return (
                  <li className="w-[60%]" key={activity.id}>
                    <ActivityCard activityData={activity} />
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
      <FeedFooter elementToObserve={elementToObserve} />
    </section>
  );
}
