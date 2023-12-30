import {
  Textarea,
  Select,
  SelectItem,
  Input,
  Autocomplete,
  AutocompleteItem,
  Slider,
  ModalFooter,
  Button,
  ModalBody,
} from "@nextui-org/react";
import PropTypes from "prop-types";
import { ACTIVITY_HOURS, ACTIVITY_MINUTES } from "../../../services/helpers";
import { useRef, useState } from "react";
import { useUserSessionStore } from "../../../store/userSession";
import { useUserActivitiesStore } from "../../../store/userActivities";
import { useSportsStore } from "../../../store/sports";

export function CreateActivityForm({ onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const authToken = useUserSessionStore((state) => state.authToken);
  const addActivity = useUserActivitiesStore((state) => state.addActivity);
  const sports = useSportsStore((state) => state.sports);

  const userInputData = {
    nameRef: useRef(),
    descriptionRef: useRef(),
    sportRef: useRef(),
    dayRef: useRef(),
    hourRef: useRef(),
    minutesRef: useRef(),
    durationRef: useRef(0.5),
    locationRef: useRef(),
    participantsRef: useRef(),
  };
  const handleAddActivity = async () => {
    setIsLoading(true);

    await addActivity(
      {
        name: userInputData.nameRef.current,
        location: userInputData.locationRef.current,
        sport_id: userInputData.sportRef.current,
        day: userInputData.dayRef.current,
        hour: `${userInputData.hourRef.current}:${userInputData.minutesRef.current}:00`,
        duration: userInputData.durationRef.current * 3600,
        description: userInputData.descriptionRef.current,
        max_participants: parseInt(userInputData.participantsRef.current),
      },
      authToken
    );

    onClose();
  };
  return (
    <>
      <ModalBody>
        <Input
          size="sm"
          label="Titulo"
          variant="bordered"
          onValueChange={(value) => {
            userInputData.nameRef.current = value;
          }}
        />
        <Input
          size="sm"
          label="Ubicación"
          variant="bordered"
          onValueChange={(value) => {
            userInputData.locationRef.current = value;
          }}
        />
        <Autocomplete
          label="Tipo de actividad"
          size="sm"
          variant="bordered"
          onSelectionChange={(value) => {
            userInputData.sportRef.current = value;
          }}
        >
          {sports.map((sports) => (
            <AutocompleteItem key={sports.id} value={sports.name}>
              {sports.name}
            </AutocompleteItem>
          ))}
        </Autocomplete>
        <span className="flex gap-[1em]">
          <Input
            size="sm"
            type="date"
            classNames={{ base: "max-w-[49%]" }}
            variant="bordered"
            onValueChange={(value) => {
              userInputData.dayRef.current = value;
            }}
          />
          <Input
            size="sm"
            classNames={{ base: "max-w-[49%]" }}
            type="text"
            label="Participantes"
            variant="bordered"
            onValueChange={(value) => {
              userInputData.participantsRef.current = value;
            }}
          />
        </span>

        <span className="flex gap-[1em]">
          <Select
            label="Hora"
            onSelectionChange={(value) => {
              userInputData.hourRef.current = Object.entries(value)[0][1];
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
              userInputData.minutesRef.current = Object.entries(value)[0][1];
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
        </span>
        <Slider
          label="Duración"
          step={0.5}
          maxValue={6}
          minValue={0}
          defaultValue={0.5}
          getValue={(hours) => `${hours} horas`}
          showSteps={true}
          onChange={(value) => {
            userInputData.durationRef.current = value;
          }}
        />
        <Textarea
          label="Descripción"
          variant="bordered"
          onValueChange={(value) => {
            userInputData.descriptionRef.current = value;
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
          onPress={handleAddActivity}
        >
          Crear
        </Button>
      </ModalFooter>
    </>
  );
}
CreateActivityForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};
