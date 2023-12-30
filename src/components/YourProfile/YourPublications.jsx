import { Tabs, Tab } from "@nextui-org/react";
import { YourActivities } from "./YourActivities";
import PropTypes from "prop-types";

export function YourPublications({ userActivities }) {
  return (
    <section className="flex flex-col w-full">
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
YourPublications.propTypes = {
  userActivities: PropTypes.array,
};
