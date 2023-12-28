import { Popups, usePopups } from "../hooks/usePopups";
import { UserPublications } from "../components/profile/UserPublications";
import { UserProfile } from "../components/profile/UserProfile";
import { useParams } from "react-router-dom";
import { useActivity } from "../hooks/useActivity";
import { useSportsStore } from "../store/sports";
import { Suspense, lazy } from "react";

const EditProfilePopup = lazy(() =>
  import("../components/popups/profile/EditProfilePopup")
);
const RegisterActivityPopup = lazy(() =>
  import("../components/popups/activity/RegisterActivityPopup")
);

export default function Profile() {
  const { popups } = usePopups();
  const { username } = useParams();
  const { userActivities, editActivity } = useActivity(username);
  const sports = useSportsStore((state) => state.sports);

  return (
    <main className="flex my-[4rem] justify-evenly w-[80%]">
      {popups[Popups.EditUser] && (
        <Suspense>
          <EditProfilePopup />
        </Suspense>
      )}
      {popups[Popups.AddActivity] && (
        <Suspense>
          <RegisterActivityPopup
            sports={sports}
            userActivities={userActivities}
          />
        </Suspense>
      )}
      <UserProfile userActivities={userActivities} />
      <UserPublications
        userActivities={userActivities}
        editActivity={editActivity}
      />
    </main>
  );
}
