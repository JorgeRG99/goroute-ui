import { ProfileActivityCardSkeleton } from "../../skeletons/ProfileActivityCardSkeleton";
import PropTypes from "prop-types";
import { useSportsStore } from "../../../store/sports";
import { Suspense, lazy } from "react";

const OthersNoPublications = lazy(() => import("./OthersNoPublications"));
const PostCard = lazy(() => import("../../cards/PostCard"));

export function OthersPosts({ userPosts }) {
  const sports = useSportsStore((state) => state.sports);

  return (
    <main className="w-full flex">
      {userPosts && sports ? (
        userPosts.length === 0 ? (
          <Suspense fallback={<div>...</div>}>
            <OthersNoPublications type={"publicaciones"} />
          </Suspense>
        ) : (
          <ul className="flex flex-col gap-[1rem] items-center w-full">
            {userPosts?.map((post) => {
              return (
                <li key={post.id}>
                  <PostCard
                    isCurrentUserProfile={false}
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
OthersPosts.propTypes = {
  userPosts: PropTypes.array.isRequired,
};
