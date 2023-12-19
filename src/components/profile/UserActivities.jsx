import { ProfileActivityCard } from "../cards/ProfileActivityCard";
import { ProfileActivityCardSkeleton } from "../skeletons/ProfileActivityCardSkeleton";
import PropTypes from "prop-types";
import { NoPublications } from "./NoPublications";

export function UserActivities({ userActivities }) {
  return (
    <main className="w-full flex">
      {!userActivities ? (
        <div className="grid grid-cols-user-activities items-center gap-[1rem] w-full">
          <ProfileActivityCardSkeleton />
          <ProfileActivityCardSkeleton />
          <ProfileActivityCardSkeleton />
          <ProfileActivityCardSkeleton />
          <ProfileActivityCardSkeleton />
          <ProfileActivityCardSkeleton />
        </div>
      ) : userActivities.length === 0 ? (
        <NoPublications type={"actividades"} />
      ) : (
        <ul className="grid grid-cols-user-activities gap-[1rem] items-center w-full">
          {userActivities.map((activity) => {
            return (
              <li key={activity.id}>
                <ProfileActivityCard activityData={activity} />
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
UserActivities.propTypes = {
  userActivities: PropTypes.array,
};
