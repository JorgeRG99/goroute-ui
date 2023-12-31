import { ProfileActivityCardSkeleton } from "../../skeletons/ProfileActivityCardSkeleton";
import { useSportsStore } from "../../../store/sports";
import { useUserPostsStore } from "../../../store/userPosts";
import { Suspense, lazy } from "react";
import { PostCard } from "../../Cards/PostCard";

const NoPublications = lazy(() => import("./NoPublications"));

export default function YourPosts() {
  const sports = useSportsStore((state) => state.sports);
  const yourPosts = useUserPostsStore((state) => state.yourPosts);

  return (
    <main className="w-full flex">
      {yourPosts && sports ? (
        yourPosts.length === 0 ? (
          <Suspense fallback={<div>...</div>}>
            <NoPublications type={"actividades"} />
          </Suspense>
        ) : (
          <ul className="flex flex-col gap-[1rem] items-center w-full">
            {yourPosts?.map((post) => {
              return (
                <li key={post.id}>
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
