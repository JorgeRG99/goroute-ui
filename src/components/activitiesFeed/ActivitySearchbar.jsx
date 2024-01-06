import { Input } from "@nextui-org/react";
import { Search } from "../Icons/Search";
import debounce from "just-debounce-it";
import PropTypes from "prop-types";

export function ActivitySearchbar({ setTitleFilter }) {
  const onValueChangeDebounced = debounce((value) => {
    setTitleFilter(value);
  }, 300);

  return (
    <Input
      radius="xl"
      type="text"
      size="sm"
      placeholder="Partido de futbol amateur..."
      variant="faded"
      onValueChange={onValueChangeDebounced}
      classNames={{ base: "w-[70%]" }}
      endContent={<Search />}
    />
  );
}

ActivitySearchbar.propTypes = {
  setTitleFilter: PropTypes.func.isRequired,
};
