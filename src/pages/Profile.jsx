import { EditProfilePopup } from "../components/popups/EditProfilePopup";
import { UserInfo } from "../components/profile/UserInfo";
import { useActivity } from "../hooks/useActivity";
import { Popups, usePopups } from "../hooks/usePopups";
import { UserPublications } from "../components/profile/UserPublications";
import { UserProfileSkeleton } from "../components/skeletons/UserProfileSkeleton";

export function Profile() {
  const { popups } = usePopups();
  const { userActivities } = useActivity();
  return (
    <main className="flex my-[10vh] w-[90%] m-auto">
      {popups[Popups.Edit] && <EditProfilePopup />}
      {userActivities.length === 0 ? (
        <UserProfileSkeleton />
      ) : (
        <UserInfo userActivities={userActivities} />
      )}
      <UserPublications />
    </main>
  );
}
