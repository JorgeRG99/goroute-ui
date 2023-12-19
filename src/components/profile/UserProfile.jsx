import { useContext } from "react";
import { Button, User } from "@nextui-org/react";
import { Popups, usePopups } from "../../hooks/usePopups";
import { userInitials } from "../../services/helpers";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { UserProfileSkeleton } from "../skeletons/UserProfileSkeleton";
import { UserContext } from "../../context/user";
import { ToggleFollowButton } from "../buttons/ToggleFollowButton";
import { UserFollowersData } from "./userData/UserFollowersData";
import { UserFollowsData } from "./userData/UserFollowsData";
import { UserActivitiesData } from "./userData/UserActivitiesData";
import { UserPostsData } from "./userData/UserPostsData";
import { FollowersPopup } from "../popups/profile/FollowersPopup";

export function UserProfile({ userActivities }) {
  const { username } = useParams();
  const { userData } = useContext(UserContext);
  const { togglePopup } = usePopups();
  const { userSince, profileData } = useUser();
  const isCurrentUserProfile = userData.username === username;
  const { popups } = usePopups();

  return (
    <section className="flex-none sticky top-[4rem] h-[20em] z-40 w-[55%] px-[1em]">
      {profileData ? (
        <>
          {popups[Popups.Followers] && (
            <FollowersPopup followersList={profileData.followers} />
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
            {!isCurrentUserProfile && (
              <ToggleFollowButton id={profileData.id} />
            )}
          </header>
          <main className="flex flex-col gap-[.5em] py-[2em]">
            <article className="flex gap-[5px] items-end text-[.9em]">
              <UserActivitiesData userActivities={userActivities} />
              <UserPostsData />
              <UserFollowersData
                isCurrentUserProfile={isCurrentUserProfile}
                followers={profileData.followers}
              />
              <UserFollowsData follows={profileData.follows} />
            </article>
            <article className="ml-[.6em] flex flex-col gap-[8px]">
              <p className="text-[.85em] text-[#8c8c8c]">{userSince}</p>
              <p className="text-[.95em]">{profileData.biography}</p>
            </article>
          </main>
          {isCurrentUserProfile && (
            <footer className="flex items-center">
              <Button
                size="sm"
                onPress={() => togglePopup(Popups.Edit)}
                color="secondary"
                variant="flat"
              >
                Editar Perfil
              </Button>
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
};
