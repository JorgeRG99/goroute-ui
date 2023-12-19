import { EditProfilePopup } from "../components/popups/profile/EditProfilePopup";
import { Popups, usePopups } from "../hooks/usePopups";
import { UserPublications } from "../components/profile/UserPublications";
import { UserProfile } from "../components/profile/UserProfile";
import { useParams } from "react-router-dom";
import { useActivity } from "../hooks/useActivity";
import { useEffect, useState } from "react";

export function Profile() {
  const { popups } = usePopups();
  const { username } = useParams();
  const { getActivitiesByUser } = useActivity();
  const [userActivities, setUserActivities] = useState();

  useEffect(() => {
    const getUserActivties = async () => {
      const activities = await getActivitiesByUser(username);

      setUserActivities(activities);
    };

    getUserActivties();
  }, [username]);

  return (
    <main className="flex my-[4rem] justify-evenly w-[80%]">
      {popups[Popups.Edit] && <EditProfilePopup />}
      <UserProfile userActivities={userActivities} />
      <UserPublications userActivities={userActivities} />
    </main>
  );
}
