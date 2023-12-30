import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { Danger } from "../../icons/Danger";
import { Button, Divider } from "@nextui-org/react";
import PropTypes from "prop-types";
import { useUserActivitiesStore } from "../../../store/userActivities";
import { useState } from "react";

export default function CancelActivityPopup({
  isOpen,
  onOpenChange,
  activityId,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const deleteActivity = useUserActivitiesStore(
    (state) => state.deleteActivity
  );

  return (
    <Modal
      backdrop="blur"
      size="sm"
      className="bg-gradient-to-br from-white via-white to-slate-200"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className=" flex  gap-[5.6em] justify-start">
              <Danger />
              <p>¡Atención!</p>
            </ModalHeader>
            <Divider />
            <ModalBody className="gap-[2em] pt-[1em] px-[2em]">
              <p>
                Estás a punto de cancelar tu actividad, no podrás revertir esta
                acción.
              </p>
              <p>¿Estás seguro de que deseas continuar?</p>
            </ModalBody>
            <ModalFooter className="flex justify-evenly">
              <Button
                color="danger"
                variant="flat"
                onPress={async () => {
                  setIsLoading(true);
                  await deleteActivity(activityId);
                  onOpenChange();
                }}
                isLoading={isLoading ? true : false}
              >
                Cancelar
              </Button>
              <Button
                color="primary"
                variant="flat"
                onPress={onOpenChange}
                isDisabled={isLoading ? true : false}
              >
                Mantener
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

CancelActivityPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  activityId: PropTypes.string.isRequired,
};
