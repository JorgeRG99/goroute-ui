import { EditProfilePopup } from "../components/popups/EditProfilePopup";
import { useActivity } from "../hooks/useActivity";
import { Popups, usePopups } from "../hooks/usePopups";
import { UserPublications } from "../components/profile/UserPublications";
import { UserProfileSkeleton } from "../components/skeletons/UserProfileSkeleton";
import { UserProfile } from "../components/profile/UserProfile";

export function Profile() {
  const { popups } = usePopups();
  const { userActivities } = useActivity();

  return (
    <main className="flex my-[4rem] justify-evenly">
      {popups[Popups.Edit] && <EditProfilePopup />}
      {!userActivities ? (
        <UserProfileSkeleton />
      ) : (
        <UserProfile userActivities={userActivities} />
      )}
      <UserPublications userActivities={userActivities} />
    </main>
  );
}
