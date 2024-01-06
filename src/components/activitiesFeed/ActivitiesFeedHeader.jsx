import { ActivityFilter } from "./ActivityFilter";
import { ActivitySearchbar } from "./ActivitySearchbar";
import PropTypes from "prop-types";

export function ActivitiesFeedHeader({ setSportFilter, setTitleFilter }) {
  return (
    <header className="my-[2.5em] flex items-center justify-center gap-[1em] w-[90%]">
      <ActivityFilter setSportFilter={setSportFilter} />
      <ActivitySearchbar setTitleFilter={setTitleFilter} />
    </header>
  );
}

ActivitiesFeedHeader.propTypes = {
  setSportFilter: PropTypes.func.isRequired,
  setTitleFilter: PropTypes.func.isRequired,
};
