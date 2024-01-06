import PropTypes from "prop-types";
import { PostTagSearchBar } from "./PostTagSearchBar";
import { PostTitleSearchBar } from "./PostTitleSearchBar";

export function PostsFeedHeader({ setTagFilter, setTitleFilter }) {
  return (
    <header className="my-[2.5em] flex items-center justify-center gap-[1em] w-[90%]">
      <PostTagSearchBar setTagFilter={setTagFilter} />
      <PostTitleSearchBar setTitleFilter={setTitleFilter} />
    </header>
  );
}

PostsFeedHeader.propTypes = {
  setTagFilter: PropTypes.func.isRequired,
  setTitleFilter: PropTypes.func.isRequired,
};
