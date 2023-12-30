import { useParams } from "react-router-dom";
import { OthersProfileInfo } from "../components/OthersProfile/OthersProfileData/OthersProfileInfo";
import { useActivity } from "../hooks/useActivity";
import { OthersPublications } from "../components/OthersProfile/OthersPublications/OthersPublications";

export default function OtherUserProfile() {
  const { username } = useParams();
  const { userActivities } = useActivity(username);

  return (
    <main className="flex my-[4rem] justify-evenly w-[80%]">
      <OthersProfileInfo userActivities={userActivities} username={username} />
      <OthersPublications userActivities={userActivities} />
    </main>
  );
}
