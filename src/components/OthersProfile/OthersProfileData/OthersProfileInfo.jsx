import { User } from "@nextui-org/react";
import { userInitials } from "../../../services/helpers";
import { UserProfileSkeleton } from "../../skeletons/UserProfileSkeleton";
import { OthersActivitiesHistory } from "./OthersActivityHistory";
import PropTypes from "prop-types";
import { useUser } from "../../../hooks/useUser";
import ToggleFollowButton from "../../buttons/ToggleFollowButton";

export function OthersProfileInfo({ userActivities, username }) {
  const { profileData, userSince } = useUser(username);

  return (
    <section className="flex-none sticky top-[4rem] h-[20em] z-40 w-[55%] px-[1em]">
      {profileData ? (
        <>
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
            <ToggleFollowButton id={profileData.id} />
          </header>
          <main className="flex flex-col gap-[1em] py-[2em] w-full items-start">
            <article className="flex gap-[5px] items-end text-[.9em]">
              <p>{!userActivities ? 0 : userActivities.length}</p>
              <p className="font-bold mr-[1em]">Actividades</p>

              <p>0</p>
              <p className="font-bold mr-[1em]">Publicaciones</p>

              <p>{!profileData.followers ? 0 : profileData.followers.length}</p>
              <p className="font-bold mr-[1em]">Seguidores</p>

              <p>{!profileData.follows ? 0 : profileData.follows.length}</p>
              <p className="font-bold mr-[1em]">Seguidos</p>
            </article>
            <article className="flex flex-col gap-[8px] w-[70%]">
              <p className="text-[.85em] text-[#8c8c8c]">{userSince}</p>
              <p className="text-[.95em] w-full">{profileData.biography}</p>
            </article>
            <OthersActivitiesHistory userId={profileData.id} />
          </main>
        </>
      ) : (
        <UserProfileSkeleton />
      )}
    </section>
  );
}
OthersProfileInfo.propTypes = {
  userActivities: PropTypes.array,
  username: PropTypes.string.isRequired,
};
