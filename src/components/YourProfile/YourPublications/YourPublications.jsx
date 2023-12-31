import { Tabs, Tab } from "@nextui-org/react";
import { YourActivities } from "./YourActivities";
import { lazy, Suspense } from "react";

const YourPosts = lazy(() => import("./YourPosts"));

export function YourPublications() {
  return (
    <section className="flex flex-col w-full">
      <Tabs
        className="w-full"
        classNames={{ panel: "w-auto" }}
        aria-label="Options"
      >
        <Tab key="activities" title="Actividades">
          <YourActivities />
        </Tab>
        <Tab key="posts" title="Publicaciones">
          <Suspense>
            <YourPosts />
          </Suspense>
        </Tab>
      </Tabs>
    </section>
  );
}
