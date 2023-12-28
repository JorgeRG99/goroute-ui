import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Chip,
  Image,
  useDisclosure,
} from "@nextui-org/react";
import { formatActivityDate, getActivitySport } from "../../services/helpers";
import { createPortal } from "react-dom";
import { EditActivity } from "../buttons/EditActivity";
import PropTypes from "prop-types";
import { ActivityMembers } from "./ActivityMembers";
import { Suspense, lazy } from "react";

const JoinActivityPopup = lazy(() =>
  import("../popups/activity/JoinActivityPopup")
);
const EditActivityPopup = lazy(() =>
  import("../popups/activity/EditActivityPopup")
);

export function ActivityCard({
  activityData,
  sports,
  isCurrentUserProfile,
  editActivity,
}) {
  const {
    isOpen: isOpenJoinActivityPopup,
    onOpen: onOpenJoinActivityPopup,
    onOpenChange: onOpenChangeJoinActivityPopup,
  } = useDisclosure();

  const {
    isOpen: isOpenEditActivityPopup,
    onOpen: onOpenEditActivityPopup,
    onOpenChange: onOpenChangeEditActivityPopup,
  } = useDisclosure();

  const sport = getActivitySport(activityData.sport_id, sports);
  const date = formatActivityDate(activityData.day);

  return (
    <>
      {isOpenJoinActivityPopup && (
        <Suspense>
          {createPortal(
            <JoinActivityPopup
              activityData={activityData}
              isOpen={isOpenJoinActivityPopup}
              onOpenChange={onOpenChangeJoinActivityPopup}
              sport={sport}
              date={date}
              participants={activityData.participants}
              setParticipants={activityData.setParticipants}
            />,
            document.body
          )}
        </Suspense>
      )}
      {isOpenEditActivityPopup && (
        <Suspense>
          {createPortal(
            <EditActivityPopup
              isOpen={isOpenEditActivityPopup}
              onOpenChange={onOpenChangeEditActivityPopup}
              activityData={activityData}
              editActivity={editActivity}
              sports={sports}
              sport={sport}
            />,
            document.body
          )}
        </Suspense>
      )}
      <Card
        isFooterBlurred
        className="w-full h-[450px] col-span-12 sm:col-span-5"
        radius="md"
      >
        <CardHeader className="absolute z-10 top-1 flex items-start justify-between">
          <Chip variant="solid" color="secondary">
            {sport}
          </Chip>
          {activityData.participants.length !== 0 ? (
            <ActivityMembers
              participants={activityData.participants}
              setParticipants={activityData.setParticipants}
            />
          ) : (
            <Chip className="bg-tertiary-blurred text-white">
              Sin participantes
            </Chip>
          )}
        </CardHeader>
        <Image
          removeWrapper
          alt="Card example background"
          className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
          src="https://nextui.org/images/hero-card-complete.jpeg"
        />
        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
          <div>
            <p className="text-white capitalize">{activityData.name}</p>
            <p className="text-white text-tiny">{date}</p>
          </div>
          {isCurrentUserProfile ? (
            <EditActivity onOpen={onOpenEditActivityPopup} />
          ) : (
            <Button
              onPress={onOpenJoinActivityPopup}
              className="text-tiny"
              color="primary"
              variant="shadow"
              radius="full"
              size="sm"
            >
              Únete
            </Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
}

ActivityCard.propTypes = {
  activityData: PropTypes.object.isRequired,
  sports: PropTypes.array.isRequired,
  isCurrentUserProfile: PropTypes.bool,
  editActivity: PropTypes.func,
};
