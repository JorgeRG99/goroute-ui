import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Divider,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { RemoveParticipantCard } from "../../Cards/RemoveParticipantCard";
import PropTypes from "prop-types";
import { useState } from "react";
import { useUserActivitiesStore } from "../../../store/userActivities";

export default function EditParticipantsPopup({
  isOpen,
  onOpenChange,
  participants,
  setParticipants,
  updatedData,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const editActivity = useUserActivitiesStore((state) => state.editActivity);

  const handleEditActivity = async () => {
    setIsLoading(true);

    await editActivity(updatedData);
    onOpenChange();
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="top-center"
      scrollBehavior="inside"
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex text-center flex-col py-[1.5em]">
              {updatedData.max_participants - participants.length !== 0
                ? `Debes eliminar al menos
                ${Math.abs(
                  updatedData.max_participants - participants.length
                )} participantes`
                : "¡Ya puedes actualizar la actividad!"}
            </ModalHeader>
            <Divider />
            <ModalBody className="py-[1em]">
              {participants?.map((user) => {
                return (
                  <RemoveParticipantCard
                    key={user.id}
                    user={user}
                    onOpenChange={onOpenChange}
                    participants={participants}
                    setParticipants={setParticipants}
                    activityId={updatedData.id}
                  />
                );
              })}
            </ModalBody>
            <ModalFooter className="flex items-center justify-center pt-0">
              <Button
                isLoading={isLoading ? true : false}
                onPress={handleEditActivity}
                color="success"
                className="text-white"
                isDisabled={participants.length > updatedData.max_participants}
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
EditParticipantsPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  participants: PropTypes.array.isRequired,
  setParticipants: PropTypes.func.isRequired,
  updatedData: PropTypes.object.isRequired,
};
