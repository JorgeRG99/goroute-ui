import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useSportsStore } from "../../store/sports";
import PropTypes from "prop-types";

export function ActivityFilter({ setSportFilter }) {
  const sports = useSportsStore((state) => state.sports);

  return (
    <Autocomplete
      size="md"
      label="Elige tu Deporte"
      variant="faded"
      isClearable={true}
      placeholder="Seleciona un deporte"
      labelPlacement="outside"
      className="max-w-[27%]"
      onSelectionChange={(value) => {
        setSportFilter(value);
      }}
    >
      {sports?.map((sport) => (
        <AutocompleteItem key={sport.id} value={sport.name}>
          {sport.name}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
}

ActivityFilter.propTypes = {
  setSportFilter: PropTypes.func.isRequired,
};
