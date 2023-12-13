import { useContext } from "react";
import { Button, User } from "@nextui-org/react";
import { Popups, usePopups } from "../../hooks/usePopups";
import { userInitials } from "../../services/helpers";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { UserProfileSkeleton } from "../skeletons/UserProfileSkeleton";
import { UserContext } from "../../context/user";
import { ToggleFollowButton } from "../suggestedUsers/ToggleFollowButton";
import { UserFollowersData } from "./userData/UserFollowersData";
import { UserFollowsData } from "./userData/UserFollowsData";
import { UserActivitiesData } from "./userData/UserActivitiesData";
import { UserPostsData } from "./userData/UserPostsData";

export function UserProfile({ userActivities }) {
  const { username } = useParams();
  const { userData } = useContext(UserContext);
  const { togglePopup } = usePopups();
  const { userSince, profileData } = useUser();

  return (
    <>
      {profileData ? (
        <section className="flex-none sticky top-[4rem] h-[20em] z-40 px-[1em]">
          <header className="flex items-center gap-[30px]">
            <User
              name={`${profileData.name} ${profileData.surname}`}
              description={`@${profileData.username}`}
              classNames={{
                name: "text-[1.3em] font-light",
                base: "gap-[20px]",
                description: "text-[.97em] text-primary font-extralight",
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
            {userData.username !== username && (
              <ToggleFollowButton id={profileData.id} />
            )}
          </header>
          <main className="flex flex-col gap-[.5em] py-[2em]">
            <span className="flex gap-[5px] items-end text-[.9em]">
              <UserActivitiesData userActivities={userActivities} />
              <UserPostsData />
              <UserFollowersData followers={profileData.followers} />
              <UserFollowsData followers={profileData.follows} />
            </span>
            <span className="ml-[.6em] flex flex-col gap-[8px]">
              <p className="text-[.85em] text-[#8c8c8c]">{userSince}</p>
              <p className="text-[.95em]">{profileData.biography}</p>
            </span>
          </main>
          {userData.username === username && (
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
        </section>
      ) : (
        <UserProfileSkeleton />
      )}
    </>
  );
}
UserProfile.propTypes = {
  userActivities: PropTypes.array,
};
