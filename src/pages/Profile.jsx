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
    <main className="flex my-[10vh] w-[90%] m-auto gap-[300px]">
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
