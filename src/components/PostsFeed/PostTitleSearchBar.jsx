import { Input } from "@nextui-org/react";
import debounce from "just-debounce-it";
import PropTypes from "prop-types";
import { Search } from "../Icons/Search";

export function PostTitleSearchBar({ setTitleFilter }) {
  const onValueChangeDebounced = debounce((value) => {
    setTitleFilter(value);
  }, 300);

  return (
    <Input
      radius="xl"
      type="text"
      size="md"
      labelPlacement="outside"
      label="Descubre Tips de Salud y Deporte"
      placeholder="Ej: Los mejores alimentos.para tu ciclo de definición.."
      variant="faded"
      onValueChange={onValueChangeDebounced}
      classNames={{ base: "w-[70%]" }}
      endContent={<Search />}
    />
  );
}

PostTitleSearchBar.propTypes = {
  setTitleFilter: PropTypes.func.isRequired,
};
