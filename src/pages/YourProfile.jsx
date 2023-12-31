import { Popups, usePopups } from "../hooks/usePopups";
import { useSportsStore } from "../store/sports";
import { Suspense, lazy } from "react";
import { YourProfileInfo } from "../components/YourProfile/YourProfileData/YourProfileInfo";
import { YourPublications } from "../components/YourProfile/YourPublications/YourPublications";

const EditProfilePopup = lazy(() =>
  import("../components/popups/profile/EditProfilePopup")
);
const RegisterActivityPopup = lazy(() =>
  import("../components/popups/activity/RegisterActivityPopup")
);

export default function YourProfile() {
  const { popups } = usePopups();
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
          <RegisterActivityPopup sports={sports} />
        </Suspense>
      )}
      <YourProfileInfo />
      <YourPublications />
    </main>
  );
}
