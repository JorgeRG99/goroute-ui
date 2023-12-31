import { User } from "@nextui-org/react";
import { Popups, usePopups } from "../../../hooks/usePopups";
import { userInitials } from "../../../services/helpers";
import PropTypes from "prop-types";
import { UserProfileSkeleton } from "../../skeletons/UserProfileSkeleton";
import { EditProfile } from "../../buttons/EditProfile";
import { Suspense, lazy } from "react";
import { useUserSessionStore } from "../../../store/userSession";
import { YourActivitiesHistory } from "./YourActivitiesHistory";
import { YourFollowsData } from "./YourFollowsData";
import { YourFollowersData } from "./YourFollowersData";
import { useUserActivitiesStore } from "../../../store/userActivities";
import { useUserPostsStore } from "../../../store/userPosts";

const FollowersPopup = lazy(() =>
  import("../../popups/profile/FollowersPopup")
);
const FollowsPopup = lazy(() => import("../../popups/profile/FollowsPopup"));

export function YourProfileInfo() {
  const userData = useUserSessionStore((state) => state.userData);
  const userSince = useUserSessionStore((state) => state.userSince);
  const yourActivities = useUserActivitiesStore(
    (state) => state.yourActivities
  );
  const yourPosts = useUserPostsStore((state) => state.yourPosts);
  const { popups } = usePopups();

  return (
    <section className="flex-none sticky top-[4rem] h-[20em] z-40 w-[55%] px-[1em]">
      {userData ? (
        <>
          {popups[Popups.Followers] && (
            <Suspense>
              <FollowersPopup followersList={userData.followers} />
            </Suspense>
          )}
          {popups[Popups.Follows] && (
            <Suspense>
              <FollowsPopup followsList={userData.follows} />
            </Suspense>
          )}
          <header className="flex items-center gap-[30px]">
            <User
              name={`${userData.name} ${userData.surname}`}
              description={`@${userData.username}`}
              classNames={{
                name: "text-[1.3em] font-light capitalize",
                base: "gap-[20px]",
                description: "text-[.97em] text-primary font-semibold",
              }}
              avatarProps={{
                src: userData.avatar || undefined,
                name: userInitials(userData.name, userData.surname),
                isBordered: true,
                classNames: {
                  base: "w-[60px] h-[60px]",
                  name: "text-[20px] font-extralight",
                },
              }}
            />
          </header>
          <main className="flex flex-col gap-[1em] py-[2em] w-full items-start">
            <article className="flex gap-[5px] items-end text-[.9em]">
              <p>{!yourActivities ? 0 : yourActivities.length}</p>
              <p className="font-bold mr-[1em]">Actividades</p>
              <p>{!yourPosts ? 0 : yourPosts.length}</p>
              <p className="font-bold mr-[1em]">Publicaciones</p>
              <YourFollowersData followers={userData.followers} />
              <YourFollowsData follows={userData.follows} />
            </article>
            <article className="flex flex-col gap-[8px] w-[70%]">
              <p className="text-[.85em] text-[#8c8c8c]">{userSince}</p>
              <p className="text-[.95em] w-full">{userData.biography}</p>
            </article>
            <YourActivitiesHistory userId={userData.id} />
          </main>
          <footer className="flex items-center">
            <EditProfile />
          </footer>
        </>
      ) : (
        <UserProfileSkeleton />
      )}
    </section>
  );
}
YourProfileInfo.propTypes = {
  userActivities: PropTypes.array,
  pathUsername: PropTypes.string,
};
