import {
  Textarea,
  Select,
  SelectItem,
  Input,
  Slider,
  ModalFooter,
  Button,
  ModalBody,
} from "@nextui-org/react";
import PropTypes from "prop-types";
import { ACTIVITY_HOURS, ACTIVITY_MINUTES } from "../../../services/helpers";
import { useState } from "react";
import { useUserSessionStore } from "../../../store/userSession";
import { useUserActivitiesStore } from "../../../store/userActivities";
import { useSportsStore } from "../../../store/sports";
import { useActivityRegisterValidator } from "../../../hooks/FormValidationsHooks/useActivityRegisterValidator";

export function CreateActivityForm({ onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const authToken = useUserSessionStore((state) => state.authToken);
  const addActivity = useUserActivitiesStore((state) => state.addActivity);
  const sports = useSportsStore((state) => state.sports);
  const [activityData, setActivityData] = useState({
    name: "",
    description: "",
    sport_id: "",
    day: "",
    hour: "",
    minutes: "",
    duration: 1,
    location: "",
    participants: "",
  });
  const {
    isTitleInvalid,
    isDescriptionInvalid,
    isLocationInvalid,
    isParticipantsInvalid,
    isActivityDateInvalid,
    serverErrors,
    catchEmptyValues,
    catchedServerErrors,
  } = useActivityRegisterValidator(activityData);

  const handleAddActivity = async () => {
    setIsLoading(true);
    const catchedEmptyData = catchEmptyValues();

    if (!catchedEmptyData) {
      const response = await addActivity(
        {
          ...activityData,
          hour: `${activityData.hour}:${activityData.minutes}:00`,
          duration: activityData.duration * 3600,
          max_participants: parseInt(activityData.participants),
        },
        authToken
      );

      const errorOcurred = catchedServerErrors(response);

      if (!errorOcurred) onClose();
      setIsLoading(false);
    }

    setIsLoading(false);
  };

  const handleActivityDataChange = (e) => {
    setActivityData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <ModalBody>
        <div className="flex gap-[1em]">
          <Input
            size="sm"
            label="Titulo"
            variant="bordered"
            name="name"
            onChange={handleActivityDataChange}
            isInvalid={isTitleInvalid}
            errorMessage={
              isTitleInvalid &&
              "Por favor, utiliza solo letras y espacios, con un mínimo de 10 caracteres y máximo de 30 caracteres"
            }
            color={isTitleInvalid ? "danger" : undefined}
          />
          <Input
            size="sm"
            label="Ubicación"
            name="location"
            variant="bordered"
            isInvalid={isLocationInvalid}
            errorMessage={
              isLocationInvalid &&
              "Por favor, utiliza solo letras, espacios y números, con máximo de 100 caracteres"
            }
            color={isLocationInvalid ? "danger" : undefined}
            onChange={handleActivityDataChange}
          />
        </div>
        <Select
          label="Tipo de actividad"
          size="sm"
          variant="bordered"
          name="sport_id"
          onChange={handleActivityDataChange}
        >
          {sports.map((sports) => (
            <SelectItem key={sports.id} value={sports.name}>
              {sports.name}
            </SelectItem>
          ))}
        </Select>
        <span className="flex gap-[1em]">
          <Input
            size="sm"
            type="date"
            name="day"
            isInvalid={isActivityDateInvalid}
            errorMessage={
              isActivityDateInvalid &&
              "La fecha elegida debe ser como mínimo la fecha actual"
            }
            color={isActivityDateInvalid ? "danger" : undefined}
            classNames={{ base: "max-w-[49%]" }}
            variant="bordered"
            onChange={handleActivityDataChange}
          />
          <Input
            size="sm"
            classNames={{ base: "max-w-[49%]" }}
            type="text"
            name="participants"
            label="Participantes"
            variant="bordered"
            isInvalid={isParticipantsInvalid}
            errorMessage={
              isParticipantsInvalid &&
              "El valor de los participantes debe ser numérico y con un máximo de 99"
            }
            color={isParticipantsInvalid ? "danger" : undefined}
            onChange={handleActivityDataChange}
          />
        </span>

        <span className="flex gap-[1em]">
          <Select
            label="Hora"
            onChange={handleActivityDataChange}
            name="hour"
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
            onChange={handleActivityDataChange}
            name="minutes"
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
          minValue={0.5}
          defaultValue={1}
          getValue={(hours) => `${hours} horas`}
          showSteps={true}
          name="duration"
          onChange={(newValue) => {
            setActivityData((prevState) => ({
              ...prevState,
              duration: newValue,
            }));
          }}
        />
        <Textarea
          label="Descripción"
          variant="bordered"
          name="description"
          isInvalid={isDescriptionInvalid}
          errorMessage={
            isDescriptionInvalid &&
            "Por favor, utiliza solo letras, espacios y números, con un mínimo de 10 caracteres y máximo de 100 caracteres"
          }
          color={isDescriptionInvalid ? "danger" : undefined}
          onChange={handleActivityDataChange}
        />
      </ModalBody>
      <ModalFooter className="pt-[1em] flex flex-col gap-[2em]">
        {serverErrors && (
          <p className="text-danger text-[.85em]">{serverErrors}</p>
        )}
        <div className="flex gap-[1em] justify-end">
          <Button
            color="danger"
            isDisabled={isLoading ? true : false}
            variant="flat"
            onPress={onClose}
          >
            Cancelar
          </Button>
          <Button
            isLoading={isLoading ? true : false}
            color="primary"
            onPress={handleAddActivity}
            isDisabled={
              isTitleInvalid ||
              isDescriptionInvalid ||
              isLocationInvalid ||
              isParticipantsInvalid ||
              isActivityDateInvalid
                ? true
                : false
            }
          >
            Crear
          </Button>
        </div>
      </ModalFooter>
    </>
  );
}
CreateActivityForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};
