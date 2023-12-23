import { Modal, ModalContent, ModalHeader } from "@nextui-org/react";
import PropTypes from "prop-types";
import { CreateActivityForm } from "./CreateActivityForm";
import { Popups, usePopups } from "../../../hooks/usePopups";

export function RegisterActivityPopup({ sports, userActivities }) {
  const { popups, togglePopup } = usePopups();

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
            <CreateActivityForm
              sports={sports}
              userActivities={userActivities}
              onClose={onClose}
            />
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

RegisterActivityPopup.propTypes = {
  sports: PropTypes.array,
  userActivities: PropTypes.array,
};
