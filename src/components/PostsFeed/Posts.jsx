import { lazy, useEffect, useState } from "react";
import { FeedPostCardSkeleton } from "../Skeletons/FeedPostCardSkeleton";
import { useUserSessionStore } from "../../store/userSession";
import { getPostsFeed } from "../../services/post";
import { Link } from "react-router-dom";

const PostCard = lazy(() => import("../Cards/PostCard"));

export function Posts() {
  const [postsFeed, setPostsFeed] = useState(null);
  const authToken = useUserSessionStore((state) => state.authToken);

  useEffect(() => {
    const getUserPostsFeed = async () => {
      try {
        const activities = await getPostsFeed(authToken);
        setPostsFeed(activities);
      } catch (error) {
        console.error("Error fetching activities feed:", error);
      }
    };

    getUserPostsFeed();
  }, []);

  return (
    <div className="w-[50em] my-[3em]">
      {postsFeed ? (
        postsFeed.length > 0 ? (
          <ul className="flex flex-col gap-[2em] w-full items-center">
            {postsFeed.map((post) => {
              return (
                <li
                  className="w-full flex items-center justify-center"
                  key={post.id}
                >
                  <PostCard postData={post} />
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="mt-[5em] mx-auto text-[1.1em] flex flex-col gap-[2em] w-[80%]">
            <p>Lo sentimos, no hay publicaciones por el momento</p>
            <p>
              Lamentamos informarte que actualmente no hay publicaciones
              disponibles en nuestro muro. Estamos trabajando activamente para
              resolver este inconveniente.
            </p>
            <p>
              Te invitamos a explorar nuestra sección de{" "}
              <span className="text-tertiary">Actividades</span> donde podrás
              encontrar una variedad de opciones interesantes y divertidas para
              ti.
            </p>

            <Link className="mx-auto mt-[2em]" to="/">
              <span
                className="text-[.9em] text-tertiary-dark bg-tertiary-blurred py-[.7em] px-[.8em] rounded-lg hover:opacity-75 transition duration-300 ease-in-out"
                size="sm"
              >
                Ver actividades
              </span>
            </Link>
          </div>
        )
      ) : (
        <div className="flex flex-col gap-[2em] w-full items-center">
          <FeedPostCardSkeleton />
          <FeedPostCardSkeleton />
          <FeedPostCardSkeleton />
        </div>
      )}
    </div>
  );
}
