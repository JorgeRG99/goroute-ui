import { Tabs, Tab } from "@nextui-org/react";
import { OthersActivities } from "./OthersActivities";
import PropTypes from "prop-types";
import { OthersPosts } from "./OthersPosts";

export function OthersPublications({ userActivities, userPosts }) {
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
        <Tab key="music" title="Publicaciones">
          <OthersPosts userPosts={userPosts} />
        </Tab>
      </Tabs>
    </section>
  );
}
OthersPublications.propTypes = {
  userActivities: PropTypes.array,
  userPosts: PropTypes.array,
  editActivity: PropTypes.func,
};
