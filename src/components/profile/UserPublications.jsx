import { Tabs, Tab } from "@nextui-org/react";
import PropTypes from "prop-types";
import { YourActivities } from "./YourActivities";

export function UserPublications({ userActivities }) {
  return (
    <section className="flex flex-col items-end w-[55%]">
      <Tabs
        className="w-full"
        classNames={{ panel: "w-auto" }}
        aria-label="Options"
      >
        <Tab key="photos" title="Actividades">
          <YourActivities userActivities={userActivities} />
        </Tab>
        <Tab key="music" title="Publicaciones"></Tab>
      </Tabs>
    </section>
  );
}
UserPublications.propTypes = {
  userActivities: PropTypes.array,
};
