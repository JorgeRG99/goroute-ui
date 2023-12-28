import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import PropTypes from "prop-types";
import { ToggleJoin } from "../../buttons/ToggleJoin";
import { JoinActivityPopupHeader } from "./joinActivityPopup/JoinActivityPopupHeader";
import { JoinActivityPopupBody } from "./joinActivityPopup/JoinActivityPopupBody";
import { useState } from "react";

export default function JoinActivityPopup({
  activityData,
  isOpen,
  onOpenChange,
  sport,
  date,
}) {
  const {
    name,
    description,
    hour,
    duration,
    max_participants,
    location,
    user_id,
    participants,
  } = activityData;

  console.log(activityData);

  const [activityParticipants, setActivityParticipants] =
    useState(participants);

  return (
    <Modal
      backdrop="blur"
      size="md"
      placement="center"
      className="bg-gradient-to-br from-white via-white to-slate-200"
      classNames={{
        header:
          "h-[15em] bg-[url('https://nextui.org/images/hero-card-complete.jpeg')] bg-cover",
      }}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col justify-between pb-0 px-0">
              <JoinActivityPopupHeader
                duration={duration}
                location={location}
                activityData={activityData}
              />
            </ModalHeader>
            <ModalBody className="text-left py-[.75rem]">
              <JoinActivityPopupBody
                sport={sport}
                description={description}
                name={name}
                hour={hour}
                max_participants={max_participants}
                user_id={user_id}
                participants={activityParticipants}
                date={date}
              />
            </ModalBody>
            <ModalFooter className="flex justify-evenly">
              <ToggleJoin
                activityId={activityData.id}
                participants={activityParticipants}
                setParticipants={setActivityParticipants}
              />
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

JoinActivityPopup.propTypes = {
  activityData: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  sport: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  participants: PropTypes.array.isRequired,
};
