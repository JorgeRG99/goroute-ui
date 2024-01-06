import { Input } from "@nextui-org/react";
import debounce from "just-debounce-it";
import PropTypes from "prop-types";
import { Search } from "../Icons/Search";

export function PostTagSearchBar({ setTagFilter }) {
  const onValueChangeDebounced = debounce((value) => {
    setTagFilter(value);
  }, 300);

  return (
    <Input
      radius="xl"
      type="text"
      size="md"
      labelPlacement="outside"
      label="Encuentra Intereses"
      placeholder="Futbol, Baloncesto, Tenis..."
      variant="faded"
      onValueChange={onValueChangeDebounced}
      classNames={{ base: "w-[30%]" }}
      endContent={<Search />}
    />
  );
}

PostTagSearchBar.propTypes = {
  setTagFilter: PropTypes.func.isRequired,
};
