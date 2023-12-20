import {
  Textarea,
  Select,
  SelectItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Button,
  Input,
  Autocomplete,
  AutocompleteItem,
  Slider,
} from "@nextui-org/react";
import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { ACTIVITY_HOURS, ACTIVITY_MINUTES } from "../../../services/helpers";
import { useActivity } from "../../../hooks/useActivity";

export function RegisterActivityPopup({ togglePopup, popups, Popups, sports }) {
  const [isLoading, setIsLoading] = useState(false);
  const nameRef = useRef();
  const descriptionRef = useRef();
  const sportRef = useRef();
  const dayRef = useRef();
  const hourRef = useRef();
  const minutesRef = useRef();
  const durationRef = useRef();
  const locationRef = useRef();

  const { addActivity } = useActivity();

  const handleSubmit = async () => {
    setIsLoading(true);

    addActivity({
      name: nameRef.current,
      location: locationRef.current,
      sport_id: sportRef.current,
      day: dayRef.current,
      hour: `${hourRef.current}:${minutesRef.current}:00`,
      duration: durationRef.current * 3600,
      description: descriptionRef.current,
    });

    togglePopup(Popups.AddActivity);
  };

  return (
    <Modal
      isOpen={popups[Popups.AddActivity]}
      onClose={() => togglePopup(Popups.AddActivity)}
      placement="top-center"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-center">
              Publica una actividad
            </ModalHeader>
            <ModalBody>
              <Input
                size="sm"
                label="Titulo"
                variant="bordered"
                onValueChange={(value) => {
                  nameRef.current = value;
                }}
              />
              <Input
                size="sm"
                label="Ubicación"
                variant="bordered"
                onValueChange={(value) => {
                  locationRef.current = value;
                }}
              />
              <Autocomplete
                label="Tipo de actividad"
                size="sm"
                variant="bordered"
                onSelectionChange={(value) => {
                  sportRef.current = value;
                }}
              >
                {sports.map((sports) => (
                  <AutocompleteItem key={sports.id} value={sports.name}>
                    {sports.name}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
              <Input
                size="sm"
                type="date"
                variant="bordered"
                onValueChange={(value) => {
                  dayRef.current = value;
                }}
              />
              <div className="flex gap-[1em]">
                <Select
                  label="Hora"
                  onSelectionChange={(value) => {
                    hourRef.current = Object.entries(value)[0][1];
                  }}
                  size="sm"
                  variant="bordered"
                >
                  {ACTIVITY_HOURS.map((hour) => (
                    <SelectItem key={hour} value={hour}>
                      {hour}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label="Minutos"
                  onSelectionChange={(value) => {
                    minutesRef.current = Object.entries(value)[0][1];
                  }}
                  size="sm"
                  variant="bordered"
                >
                  {ACTIVITY_MINUTES.map((hour) => (
                    <SelectItem key={hour} value={hour}>
                      {hour}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <Slider
                label="Duración"
                step={0.5}
                maxValue={6}
                minValue={0}
                defaultValue={0.4}
                getValue={(hours) => `${hours} horas`}
                showSteps={true}
                onChange={(value) => {
                  durationRef.current = value;
                }}
              />
              <Textarea
                label="Descripción"
                variant="bordered"
                onValueChange={(value) => {
                  descriptionRef.current = value;
                }}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Cancelar
              </Button>
              <Button
                isLoading={isLoading ? true : false}
                color="primary"
                onPress={handleSubmit}
              >
                Crear
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

RegisterActivityPopup.propTypes = {
  togglePopup: PropTypes.func.isRequired,
  popups: PropTypes.object.isRequired,
  Popups: PropTypes.object.isRequired,
  sports: PropTypes.array,
};
