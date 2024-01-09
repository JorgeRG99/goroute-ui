import { Divider } from "@nextui-org/react";
import { COPYRIGHT } from "../../../config";
import PropTypes from "prop-types";

export default function FeedFooter({ elementToObserve }) {
  return (
    <footer ref={elementToObserve} className="w-full mt-[2em] mb-[1em]">
      <Divider className="my-[.9em] mx-auto w-[70%]" />
      <p className="text-[.8em] text-center w-full block text-default-light">
        {COPYRIGHT}
      </p>
    </footer>
  );
}

FeedFooter.propTypes = {
  elementToObserve: PropTypes.object.isRequired,
};
