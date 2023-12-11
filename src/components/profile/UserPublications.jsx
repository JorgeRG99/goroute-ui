import { Tabs, Tab } from "@nextui-org/react";
import PropTypes from "prop-types";
import { YourActivities } from "./YourActivities";

export function UserPublications({ userActivities }) {
  return (
    <div className="flex w-[100%] flex-col items-end">
      <Tabs
        className="w-[55%]"
        classNames={{ panel: "w-[55%]" }}
        aria-label="Options"
      >
        <Tab key="photos" title="Actividades">
          <YourActivities userActivities={userActivities} />
        </Tab>
        <Tab key="music" title="Publicaciones"></Tab>
      </Tabs>
    </div>
  );
}
UserPublications.propTypes = {
  userActivities: PropTypes.array,
};
