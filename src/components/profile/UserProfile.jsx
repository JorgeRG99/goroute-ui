import { User } from "@nextui-org/react";
import { Popups, usePopups } from "../../hooks/usePopups";
import { userInitials } from "../../services/helpers";
import PropTypes from "prop-types";
import { useUser } from "../../hooks/useUser";
import { UserProfileSkeleton } from "../skeletons/UserProfileSkeleton";
import { UserFollowersData } from "./userData/UserFollowersData";
import { UserFollowsData } from "./userData/UserFollowsData";
import { UserActivitiesData } from "./userData/UserActivitiesData";
import { UserPostsData } from "./userData/UserPostsData";
import { EditProfile } from "../buttons/EditProfile";
import { UserActivitiesHistory } from "./userData/UserActivitiesHistory";
import { Suspense, lazy } from "react";

const FollowersPopup = lazy(() => import("../popups/profile/FollowersPopup"));
const FollowsPopup = lazy(() => import("../popups/profile/FollowsPopup"));
const ToggleFollowButton = lazy(() => import("../buttons/ToggleFollowButton"));

export function UserProfile({ userActivities, pathUsername }) {
  const { userSince, profileData } = useUser(pathUsername);
  const { popups } = usePopups();

  return (
    <section className="flex-none sticky top-[4rem] h-[20em] z-40 w-[55%] px-[1em]">
      {profileData ? (
        <>
          {popups[Popups.Followers] && (
            <Suspense>
              <FollowersPopup followersList={profileData.followers} />
            </Suspense>
          )}
          {popups[Popups.Follows] && (
            <Suspense>
              <FollowsPopup followsList={profileData.follows} />
            </Suspense>
          )}
          <header className="flex items-center gap-[30px]">
            <User
              name={`${profileData.name} ${profileData.surname}`}
              description={`@${profileData.username}`}
              classNames={{
                name: "text-[1.3em] font-light capitalize",
                base: "gap-[20px]",
                description: "text-[.97em] text-primary font-semibold",
              }}
              avatarProps={{
                src: profileData.avatar || undefined,
                name: userInitials(profileData.name, profileData.surname),
                isBordered: true,
                classNames: {
                  base: "w-[60px] h-[60px]",
                  name: "text-[20px] font-extralight",
                },
              }}
            />
            {pathUsername && (
              <Suspense>
                <ToggleFollowButton id={profileData.id} />
              </Suspense>
            )}
          </header>
          <main className="flex flex-col gap-[1em] py-[2em] w-full items-start">
            <article className="flex gap-[5px] items-end text-[.9em]">
              <UserActivitiesData userActivities={userActivities} />
              <UserPostsData />
              <UserFollowersData
                pathUsername={pathUsername}
                followers={profileData.followers}
              />
              <UserFollowsData
                pathUsername={pathUsername}
                follows={profileData.follows}
              />
            </article>
            <article className="flex flex-col gap-[8px] w-[70%]">
              <p className="text-[.85em] text-[#8c8c8c]">{userSince}</p>
              <p className="text-[.95em] w-full">{profileData.biography}</p>
            </article>
            <UserActivitiesHistory
              activitiesHistory={profileData.joinedActivities}
            />
          </main>
          {!pathUsername && (
            <footer className="flex items-center">
              <EditProfile />
            </footer>
          )}
        </>
      ) : (
        <UserProfileSkeleton />
      )}
    </section>
  );
}
UserProfile.propTypes = {
  userActivities: PropTypes.array,
  pathUsername: PropTypes.string,
};
