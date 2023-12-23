import { EditProfilePopup } from "../components/popups/profile/EditProfilePopup";
import { Popups, usePopups } from "../hooks/usePopups";
import { UserPublications } from "../components/profile/UserPublications";
import { UserProfile } from "../components/profile/UserProfile";
import { useParams } from "react-router-dom";
import { useActivity } from "../hooks/useActivity";
import { RegisterActivityPopup } from "../components/popups/activity/RegisterActivityPopup";
import { useSports } from "../hooks/useSports";

export function Profile() {
  const { popups } = usePopups();
  const { username } = useParams();
  const { userActivities, editActivity } = useActivity(username);
  const { sports } = useSports();

  return (
    <main className="flex my-[4rem] justify-evenly w-[80%]">
      {popups[Popups.EditUser] && <EditProfilePopup />}
      {popups[Popups.AddActivity] && (
        <RegisterActivityPopup
          sports={sports}
          userActivities={userActivities}
        />
      )}
      <UserProfile userActivities={userActivities} />
      <UserPublications
        userActivities={userActivities}
        editActivity={editActivity}
      />
    </main>
  );
}
