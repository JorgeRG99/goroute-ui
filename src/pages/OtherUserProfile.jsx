import { useParams } from "react-router-dom";
import { OthersProfileInfo } from "../components/OthersProfile/OthersProfileData/OthersProfileInfo";
import { useActivity } from "../hooks/useActivity";
import { OthersPublications } from "../components/OthersProfile/OthersPublications/OthersPublications";
import { usePost } from "../hooks/usePost";

export default function OtherUserProfile() {
  const { username } = useParams();
  const { userActivities } = useActivity(username);
  const { userPosts } = usePost(username);

  return (
    <main className="flex my-[4rem] justify-evenly w-[80%]">
      <OthersProfileInfo
        userActivities={userActivities}
        userPosts={userPosts}
        username={username}
      />
      <OthersPublications
        userActivities={userActivities}
        userPosts={userPosts}
      />
    </main>
  );
}
