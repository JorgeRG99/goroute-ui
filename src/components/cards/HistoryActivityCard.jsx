import { Button, Card, CardBody, Chip, useDisclosure } from "@nextui-org/react";
import PropTypes from "prop-types";
import {
  daysUntilTargetDate,
  formatActivityDate,
  getActivitySport,
} from "../../services/helpers";
import Unlike from "../icons/Unlike";
import { Like } from "../icons/Like";
import { useActivityLikes } from "../../hooks/useActivityLikes";
import { createPortal } from "react-dom";
import { Suspense, lazy } from "react";

const JoinActivityPopup = lazy(() =>
  import("../popups/activity/JoinActivityPopup")
);

export function HistoryActivityCard({ activity, sports }) {
  const activitySport = getActivitySport(activity.sport_id, sports);
  const { activityLikesList, isLiked, handleLikeStatus } =
    useActivityLikes(activity);
  const {
    isOpen: isOpenJoinActivityPopup,
    onOpen: onOpenJoinActivityPopup,
    onOpenChange: onOpenChangeJoinActivityPopup,
  } = useDisclosure();

  return (
    <>
      {isOpenJoinActivityPopup && (
        <Suspense fallback={<div>...</div>}>
          {createPortal(
            <JoinActivityPopup
              activityData={activity}
              isOpen={isOpenJoinActivityPopup}
              onOpenChange={onOpenChangeJoinActivityPopup}
              sport={activitySport}
              date={formatActivityDate(activity.day)}
            />,
            document.body
          )}
        </Suspense>
      )}
      <Card
        isBlurred
        className="border-none bg-background/60 dark:bg-default-100/50 h-[6.5em]"
        shadow="sm"
      >
        <CardBody className="p-2 flex flex-row gap-[.5em]">
          <img
            src="https://nextui.org/images/hero-card-complete.jpeg"
            className="rounded-lg"
            alt="activity image"
            width="23%"
          />
          <div className="w-[54%] flex flex-col h-full py-[.5em] justify-evenly">
            <div className="flex gap-[.5em] items-center">
              <h3 className="text-[1.1em] font-semibold capitalize">
                {activity.name}
              </h3>
              <Chip
                variant="flat"
                classNames={{ base: "bg-tertiary-blurred h-[1.8em]" }}
                size="sm"
              >
                {activitySport}
              </Chip>
            </div>
            {activity.finished !== 0 ? (
              <p className="text-[.88em] text-secondary">Finalizada</p>
            ) : (
              <p className="text-[.88em] text-tertiary">
                {daysUntilTargetDate(activity.day)}
              </p>
            )}
          </div>
          <div className="flex flex-col w-[20%] justify-between items-end">
            <span
              onClick={handleLikeStatus}
              className="cursor-pointer flex items-center justify-end gap-[.5em] text-white"
            >
              <strong className="font-normal text-[1.1em] text-black">
                {activityLikesList.length}
              </strong>
              {isLiked ? <Unlike /> : <Like color="black" />}
            </span>
            <Button
              onPress={onOpenJoinActivityPopup}
              className="text-tiny bg-tertiary-blurred h-[38%] min-w-[5em]"
              variant="flat"
              radius="full"
            >
              Ver
            </Button>
          </div>
          <div></div>
        </CardBody>
      </Card>
    </>
  );
}

HistoryActivityCard.propTypes = {
  activity: PropTypes.object.isRequired,
  sports: PropTypes.array.isRequired,
};
