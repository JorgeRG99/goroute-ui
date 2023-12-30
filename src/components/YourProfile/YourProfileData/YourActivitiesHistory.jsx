import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import PropTypes from "prop-types";
import { HistoryActivityCard } from "../../cards/HistoryActivityCard";
import { Link } from "react-router-dom";
import { useSportsStore } from "../../../store/sports";
import { useUserJoinedActivities } from "../../../hooks/useUserJoinedActivities";

export function YourActivitiesHistory({ userId }) {
  const sports = useSportsStore((state) => state.sports);
  const { joinedActivities } = useUserJoinedActivities(userId);

  return (
    <Table
      aria-label="Activities history"
      selectionMode="single"
      classNames={{
        base: "w-[80%] max-h-[17.5em] my-[1em]",
        wrapper: "p-[.5em]",
        td: "pl-[.4em]",
      }}
    >
      <TableHeader>
        <TableColumn className="text-[.9em] bg-tertiary-blurred text-black">
          Registro de actividades
        </TableColumn>
      </TableHeader>
      <TableBody>
        {joinedActivities.length === 0 ? (
          <TableRow key={"Any activities joined"}>
            <TableCell className="flex flex-col items-center gap-[2em] py-[2em]">
              <h1>Aún no has participado en ninguna actividad</h1>
              <Link to="/">
                <span
                  className="text-[.9em] bg-tertiary-blurred py-[.7em] px-[.8em] rounded-lg hover:opacity-75 transition duration-300 ease-in-out"
                  size="sm"
                >
                  Ver activades
                </span>
              </Link>
            </TableCell>
          </TableRow>
        ) : (
          joinedActivities?.map((activity) => {
            return (
              <TableRow key={activity.id}>
                <TableCell>
                  <HistoryActivityCard activity={activity} sports={sports} />
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
}

YourActivitiesHistory.propTypes = {
  userId: PropTypes.string.isRequired,
};
