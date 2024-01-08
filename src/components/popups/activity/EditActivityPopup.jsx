import {
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
  useDisclosure,
} from "@nextui-org/react";
import PropTypes from "prop-types";
import { ACTIVITY_HOURS, ACTIVITY_MINUTES } from "../../../services/helpers";
import { Suspense, lazy, useState } from "react";
import { useUserActivitiesStore } from "../../../store/userActivities";
import { createPortal } from "react-dom";
import { useActivityDataValidator } from "../../../hooks/FormValidationsHooks/useActivityDataValidator";
import { useSportsStore } from "../../../store/sports";

const EditParticipantsPopup = lazy(() => import("./EditParticipantsPopup"));

export default function EditActivityPopup({
  activityData,
  isOpen,
  onOpenChange,
  participants,
  setParticipants,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const editActivity = useUserActivitiesStore((state) => state.editActivity);
  const sports = useSportsStore((state) => state.sports);
  const {
    isOpen: isOpenEditParticipantsPopup,
    onOpen: onOpenEditParticipantsPopup,
    onOpenChange: onOpenChangeEditParticipantsPopup,
  } = useDisclosure();
  console.log(activityData);
  const [activityNewData, setActivityNewData] = useState({
    id: activityData.id,
    name: activityData.name,
    description: activityData.description,
    sport_id: activityData.sport_id,
    day: activityData.day,
    hour: activityData.hour.slice(0, 2),
    minutes: activityData.hour.slice(3, 5),
    duration: activityData.duration / 3600,
    location: activityData.location,
    participants: activityData.max_participants.toString(),
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
  } = useActivityDataValidator(activityNewData);

  const handleEditActivity = async () => {
    setIsLoading(true);

    if (activityNewData.participants < activityData.participants.length) {
      onOpenEditParticipantsPopup();
    }

    const catchedEmptyData = catchEmptyValues();

    if (!catchedEmptyData) {
      const response = await editActivity({
        id: activityNewData.id,
        name: activityNewData.name,
        description: activityNewData.description,
        sport_id: activityNewData.sport_id,
        day: activityNewData.day,
        location: activityNewData.location,
        max_participants: activityNewData.participants,
        duration: activityNewData.duration * 3600,
        hour: `${activityNewData.hour}:${activityNewData.minutes}:00`,
      });
      const errorOcurred = catchedServerErrors(response);
      if (!errorOcurred) onOpenChange();
    }

    setIsLoading(false);
    onOpenChange();
  };

  const handleActivityNewDataChange = (e) => {
    setActivityNewData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      {isOpenEditParticipantsPopup && (
        <Suspense>
          {createPortal(
            <EditParticipantsPopup
              activityData={activityData}
              isOpen={isOpenEditParticipantsPopup}
              onOpenChange={onOpenChangeEditParticipantsPopup}
              updatedData={activityNewData}
              participants={participants}
              setParticipants={setParticipants}
            />,
            document.body
          )}
        </Suspense>
      )}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        backdrop="blur"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                Editar Actividad
              </ModalHeader>
              <ModalBody>
                <div className="flex gap-[1em]">
                  <Input
                    size="sm"
                    label="Titulo"
                    variant="bordered"
                    defaultValue={activityNewData.name}
                    onChange={handleActivityNewDataChange}
                    name="name"
                    isInvalid={isTitleInvalid}
                    errorMessage={
                      isTitleInvalid &&
                      "Por favor, utiliza solo letras, espacios y los siguientes signos de puntuación (.,), con un mínimo de 10 caracteres y máximo de 30 caracteres"
                    }
                    color={isTitleInvalid ? "danger" : undefined}
                  />
                  <Input
                    size="sm"
                    label="Ubicación"
                    defaultValue={activityNewData.location}
                    variant="bordered"
                    onChange={handleActivityNewDataChange}
                    name="location"
                    isInvalid={isLocationInvalid}
                    errorMessage={
                      isLocationInvalid &&
                      "Por favor, utiliza solo letras, espacios y números, con máximo de 100 caracteres"
                    }
                    color={isLocationInvalid ? "danger" : undefined}
                  />
                </div>
                <Select
                  label="Tipo de actividad"
                  size="sm"
                  variant="bordered"
                  name="sport_id"
                  defaultSelectedKeys={[activityNewData.sport_id]}
                  onChange={handleActivityNewDataChange}
                >
                  {sports.map((sport) => (
                    <SelectItem key={sport.id} value={sport.name}>
                      {sport.name}
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
                    classNames={{ base: "w-[50%]" }}
                    defaultValue={activityNewData.day}
                    variant="bordered"
                    onChange={handleActivityNewDataChange}
                  />
                  <Input
                    size="sm"
                    classNames={{ base: "w-[50%]" }}
                    type="text"
                    label="Participantes"
                    name="participants"
                    defaultValue={activityNewData.participants}
                    isInvalid={isParticipantsInvalid}
                    errorMessage={
                      isParticipantsInvalid &&
                      "El valor de los participantes debe ser numérico y con un máximo de 99"
                    }
                    variant="bordered"
                    onChange={handleActivityNewDataChange}
                  />
                </span>

                <span className="flex gap-[1em]">
                  <Select
                    label="Hora"
                    defaultSelectedKeys={[activityNewData.hour]}
                    onSelectionChange={handleActivityNewDataChange}
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
                    defaultSelectedKeys={[activityNewData.minutes]}
                    onSelectionChange={handleActivityNewDataChange}
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
                  defaultValue={activityNewData.duration}
                  getValue={(hours) => `${hours} horas`}
                  showSteps={true}
                  onChange={(newValue) => {
                    setActivityNewData((prevState) => ({
                      ...prevState,
                      duration: newValue,
                    }));
                  }}
                />
                <Textarea
                  label="Descripción"
                  variant="bordered"
                  defaultValue={activityNewData.description}
                  name="description"
                  isInvalid={isDescriptionInvalid}
                  errorMessage={
                    isDescriptionInvalid &&
                    "Por favor, utiliza solo letras, espacios y números, con un mínimo de 10 caracteres y máximo de 100 caracteres"
                  }
                  color={isDescriptionInvalid ? "danger" : undefined}
                  onChange={handleActivityNewDataChange}
                />
              </ModalBody>
              <ModalFooter className="pt-[1em] flex flex-col gap-[2em]">
                {serverErrors && (
                  <p className="text-danger text-[.85em]">{serverErrors}</p>
                )}
                <div className="flex gap-[1em] justify-end">
                  <Button
                    color="danger"
                    variant="flat"
                    onPress={onOpenChange}
                    isDisabled={isLoading ? true : false}
                  >
                    Cerrar
                  </Button>
                  <Button
                    color="primary"
                    isLoading={isLoading ? true : false}
                    onPress={handleEditActivity}
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
                    Actualizar
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

EditActivityPopup.propTypes = {
  activityData: PropTypes.object.isRequired,
  sports: PropTypes.array.isRequired,
  sport: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  participants: PropTypes.array.isRequired,
  setParticipants: PropTypes.func.isRequired,
};
