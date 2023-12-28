import { Suspense, lazy } from "react";
import { Popups, usePopups } from "../../hooks/usePopups";
import { useSportsStore } from "../../store/sports";

const LogoutPopup = lazy(() => import("./authentication/LogoutPopup"));
const CreateContentPopup = lazy(() =>
  import("./createContent/CreateContentPopup")
);

export default function GlobalPopups() {
  const sports = useSportsStore((state) => state.sports);
  const { popups } = usePopups();

  return (
    <>
      {popups[Popups.Logout] && (
        <Suspense fallback={<h1>...</h1>}>
          <LogoutPopup />
        </Suspense>
      )}
      {popups[Popups.CreateContent] && (
        <Suspense fallback={<h1>...</h1>}>
          <CreateContentPopup sports={sports} />
        </Suspense>
      )}
    </>
  );
}
