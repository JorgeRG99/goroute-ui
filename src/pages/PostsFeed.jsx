import { Posts } from "../components/PostsFeed/Posts";
import { SuggestedUsersList } from "../components/suggestedUsers/SuggestedUsersList";

export default function PostsFeed() {
  return (
    <section className="flex">
      <Posts />
      <SuggestedUsersList type="Posts" />
    </section>
  );
}
