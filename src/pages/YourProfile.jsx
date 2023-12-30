import { Popups, usePopups } from "../hooks/usePopups";
import { useSportsStore } from "../store/sports";
import { Suspense, lazy } from "react";
import { useUserActivitiesStore } from "../store/userActivities";
import { YourProfileInfo } from "../components/YourProfile/YourProfileData/YourProfileInfo";
import { YourPublications } from "../components/YourProfile/YourPublications";

const EditProfilePopup = lazy(() =>
  import("../components/popups/profile/EditProfilePopup")
);
const RegisterActivityPopup = lazy(() =>
  import("../components/popups/activity/RegisterActivityPopup")
);

export default function YourProfile() {
  const { popups } = usePopups();
  const sports = useSportsStore((state) => state.sports);
  const yourActivities = useUserActivitiesStore(
    (state) => state.yourActivities
  );

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
            userActivities={yourActivities}
          />
        </Suspense>
      )}
      <YourProfileInfo userActivities={yourActivities} />
      <YourPublications userActivities={yourActivities} />
    </main>
  );
}
