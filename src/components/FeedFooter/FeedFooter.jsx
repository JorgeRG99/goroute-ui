import { Divider } from "@nextui-org/react";
import { COPYRIGHT } from "../../../config";

export default function FeedFooter() {
  return (
    <footer className="w-full mt-[2em] mb-[1em]" id="post-footer">
      <Divider className="my-[.9em] mx-auto w-[70%]" />
      <p className="text-[.8em] text-center w-full block text-default-light">
        {COPYRIGHT}
      </p>
    </footer>
  );
}
