import {
  Card,
  CardHeader,
  Image,
  CardFooter,
  Button,
  Chip,
} from "@nextui-org/react";
import PropTypes from "prop-types";
import { formatActivityDate } from "../../services/helpers";

export function ProfileActivityCard({ activityData }) {
  return (
    <Card isFooterBlurred className="col-span-12 sm:col-span-5">
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <Chip variant="solid" color="secondary">
          {activityData.name}
        </Chip>
      </CardHeader>
      <Image
        removeWrapper
        alt="Card example background"
        className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
        src="https://nextui.org/images/hero-card-complete.jpeg"
      />
      <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
        <div>
          <p className="text-white text-big">{activityData.description}</p>
          <p className="text-white text-tiny">
            {formatActivityDate(activityData.day)}
          </p>
        </div>
        <Button
          className="text-tiny"
          color="primary"
          variant="shadow"
          radius="full"
          size="sm"
        >
          Editar
        </Button>
      </CardFooter>
    </Card>
  );
}

ProfileActivityCard.propTypes = {
  activityData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    day: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    sport_id: PropTypes.string.isRequired,
  }).isRequired,
};
