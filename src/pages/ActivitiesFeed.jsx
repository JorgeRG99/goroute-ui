import { Activities } from "../components/activitiesFeed/Activitites";
import { SuggestedUsersList } from "../components/suggestedUsers/SuggestedUsersList";

export default function ActivitiesFeed() {
  return (
    <>
      <Activities />
      <SuggestedUsersList type="Activity" />
    </>
  );
}
