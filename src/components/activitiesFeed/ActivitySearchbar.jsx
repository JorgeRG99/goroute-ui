import { Input } from "@nextui-org/react";
import { Search } from "../Icons/Search";
import debounce from "just-debounce-it";
import PropTypes from "prop-types";

export function ActivitySearchBar({ setTitleFilter }) {
  const onValueChangeDebounced = debounce((value) => {
    setTitleFilter(value);
  }, 300);

  return (
    <Input
      radius="xl"
      type="text"
      size="md"
      placeholder="Ej: Partido de futbol amateur..."
      label="Encuentra tu próxima actividad"
      variant="faded"
      labelPlacement="outside"
      onValueChange={onValueChangeDebounced}
      classNames={{ base: "w-[70%]" }}
      endContent={<Search />}
    />
  );
}

ActivitySearchBar.propTypes = {
  setTitleFilter: PropTypes.func.isRequired,
};
