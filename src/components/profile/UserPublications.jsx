import { Tabs, Tab } from "@nextui-org/react";
import PropTypes from "prop-types";
import { UserActivities } from "./UserActivities";
export function UserPublications({ userActivities, editActivity }) {
  return (
    <section className="flex flex-col w-full">
      <Tabs
        className="w-full"
        classNames={{ panel: "w-auto" }}
        aria-label="Options"
      >
        <Tab key="photos" title="Actividades">
          <UserActivities
            userActivities={userActivities}
            editActivity={editActivity}
          />
        </Tab>
        <Tab key="music" title="Publicaciones"></Tab>
      </Tabs>
    </section>
  );
}
UserPublications.propTypes = {
  userActivities: PropTypes.array,
  editActivity: PropTypes.func,
};
