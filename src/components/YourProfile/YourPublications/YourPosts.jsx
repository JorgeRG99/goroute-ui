import { useUserPostsStore } from "../../../store/userPosts";
import { Suspense, lazy } from "react";
import { FeedPostCardSkeleton } from "../../Skeletons/FeedPostCardSkeleton";

const YourNoPublications = lazy(() => import("./YourNoPublications"));
const PostCard = lazy(() => import("../../Cards/PostCard"));

export default function YourPosts() {
  const yourPosts = useUserPostsStore((state) => state.yourPosts);

  return (
    <main className="w-full flex">
      {yourPosts ? (
        yourPosts.length === 0 ? (
          <Suspense fallback={<div>...</div>}>
            <YourNoPublications type={"publicaciones"} />
          </Suspense>
        ) : (
          <ul className="flex flex-col gap-[1rem] items-center w-full">
            {yourPosts?.map((post) => {
              return (
                <li key={post.id} className="w-full">
                  <PostCard
                    isCurrentUserProfile={true}
                    isForProfile={true}
                    postData={post}
                  />
                </li>
              );
            })}
          </ul>
        )
      ) : (
        <div className="grid grid-cols-user-activities items-center gap-[1rem] w-full">
          <FeedPostCardSkeleton />
          <FeedPostCardSkeleton />
          <FeedPostCardSkeleton />
        </div>
      )}
    </main>
  );
}
