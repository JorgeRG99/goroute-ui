import { Divider } from "@nextui-org/react";
import { Posts } from "../components/PostsFeed/Posts";
import { SuggestedUsersList } from "../components/suggestedUsers/SuggestedUsersList";

export default function PostsFeed() {
  return (
    <section className="flex">
      <Divider orientation="vertical" className="h-full" />
      <Posts />
      <SuggestedUsersList type="Posts" />
    </section>
  );
}
