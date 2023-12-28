import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Select,
  SelectItem,
  Slider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  Input,
} from "@nextui-org/react";
import PropTypes from "prop-types";
import { ACTIVITY_HOURS, ACTIVITY_MINUTES } from "../../../services/helpers";
import { useRef, useState } from "react";

export default function EditActivityPopup({
  activityData,
  sports,
  isOpen,
  onOpenChange,
  editActivity,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const activityNewData = {
    nameRef: useRef(),
    descriptionRef: useRef(),
    sportRef: useRef(),
    dayRef: useRef(),
    hourRef: useRef(activityData.hour.slice(0, 2)),
    minutesRef: useRef(activityData.hour.slice(3, 5)),
    durationRef: useRef(activityData.duration / 3600),
    locationRef: useRef(),
    participantsRef: useRef(activityData.max_participants),
  };

  const handleEditActivity = async () => {
    setIsLoading(true);

    const updatedData = Object.fromEntries(
      Object.entries({
        id: activityData.id,
        name: activityNewData.nameRef.current,
        location: activityNewData.locationRef.current,
        sport_id: activityNewData.sportRef.current,
        day: activityNewData.dayRef.current,
        hour: `${activityNewData.hourRef.current}:${activityNewData.minutesRef.current}:00`,
        duration: activityNewData.durationRef.current * 3600,
        description: activityNewData.descriptionRef.current,
        max_participants: parseInt(activityNewData.participantsRef.current),
      }).filter((entry) => entry[1] !== undefined)
    );

    await editActivity(updatedData);

    onOpenChange();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-center">
              Editar Actividad
            </ModalHeader>
            <ModalBody>
              <Input
                size="sm"
                label="Titulo"
                variant="bordered"
                placeholder={activityData.name}
                onValueChange={(value) => {
                  activityNewData.nameRef.current = value;
                }}
              />
              <Input
                size="sm"
                label="Ubicación"
                placeholder={activityData.location}
                variant="bordered"
                onValueChange={(value) => {
                  activityNewData.locationRef.current = value;
                }}
              />
              <Autocomplete
                label="Tipo de actividad"
                size="sm"
                variant="bordered"
                defaultSelectedKey={activityData.sport_id}
                onSelectionChange={(value) => {
                  activityNewData.sportRef.current = value;
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
                  classNames={{ base: "w-[50%]" }}
                  defaultValue={activityData.day}
                  variant="bordered"
                  onValueChange={(value) => {
                    activityNewData.dayRef.current = value;
                  }}
                />
                <Input
                  size="sm"
                  classNames={{ base: "w-[50%]" }}
                  type="text"
                  label="Participantes"
                  defaultValue={activityData.max_participants}
                  variant="bordered"
                  onValueChange={(value) => {
                    activityNewData.participantsRef.current = value;
                  }}
                />
              </span>

              <span className="flex gap-[1em]">
                <Select
                  label="Hora"
                  defaultSelectedKeys={[activityData.hour.slice(0, 2)]}
                  onSelectionChange={(value) => {
                    activityNewData.hourRef.current =
                      Object.entries(value)[0][1];
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
                  defaultSelectedKeys={[activityData.hour.slice(3, 5)]}
                  onSelectionChange={(value) => {
                    activityNewData.minutesRef.current =
                      Object.entries(value)[0][1];
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
                defaultValue={activityData.duration / 3600}
                getValue={(hours) => `${hours} horas`}
                showSteps={true}
                onChange={(value) => {
                  activityNewData.durationRef.current = value;
                }}
              />
              <Textarea
                label="Descripción"
                variant="bordered"
                placeholder={activityData.description}
                onValueChange={(value) => {
                  activityNewData.descriptionRef.current = value;
                }}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onOpenChange}>
                Cerrar
              </Button>
              <Button
                color="primary"
                isLoading={isLoading ? true : false}
                onPress={handleEditActivity}
              >
                Actualizar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

EditActivityPopup.propTypes = {
  activityData: PropTypes.object.isRequired,
  sports: PropTypes.array.isRequired,
  sport: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  editActivity: PropTypes.func,
};
