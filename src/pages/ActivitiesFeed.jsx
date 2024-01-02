import { Divider } from "@nextui-org/react";
import { Activities } from "../components/activitiesFeed/Activitites";
import { SuggestedUsersList } from "../components/suggestedUsers/SuggestedUsersList";

export default function ActivitiesFeed() {
  return (
    <section className="flex">
      <Divider orientation="vertical" className="h-full" />
      <Activities />
      <SuggestedUsersList type="Activity" />
    </section>
  );
}
