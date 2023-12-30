import { Tabs, Tab } from "@nextui-org/react";
import { OthersActivities } from "./OthersActivities";
import PropTypes from "prop-types";

export function OthersPublications({ userActivities }) {
  return (
    <section className="flex flex-col w-full">
      <Tabs
        className="w-full"
        classNames={{ panel: "w-auto" }}
        aria-label="Options"
      >
        <Tab key="photos" title="Actividades">
          <OthersActivities userActivities={userActivities} />
        </Tab>
        <Tab key="music" title="Publicaciones"></Tab>
      </Tabs>
    </section>
  );
}
OthersPublications.propTypes = {
  userActivities: PropTypes.array,
  editActivity: PropTypes.func,
};
