import { Tabs, Tab } from "@nextui-org/react";
import { Activities } from "./Activities";

export function UserPublications() {
  return (
    <div className="flex w-full flex-col items-end">
      <Tabs
        className="w-[60%]"
        classNames={{ panel: "w-full" }}
        aria-label="Options"
      >
        <Tab key="photos" title="Actividades">
          <Activities />
        </Tab>
        <Tab key="music" title="Publicaciones"></Tab>
      </Tabs>
    </div>
  );
}
