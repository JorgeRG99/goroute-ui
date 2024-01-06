import { Suspense, lazy } from "react";
import { Popups, usePopups } from "../../hooks/usePopups";
import { useSportsStore } from "../../store/sports";

const LogoutPopup = lazy(() => import("./authentication/LogoutPopup"));
const CreateContentPopup = lazy(() =>
  import("./createContent/CreateContentPopup")
);
const FindUsersPopup = lazy(() => import("./FindUsers/FindUsersPopup"));

export default function GlobalPopups() {
  const sports = useSportsStore((state) => state.sports);
  const { popups } = usePopups();

  return (
    <>
      {popups[Popups.Logout] && (
        <Suspense>
          <LogoutPopup />
        </Suspense>
      )}
      {popups[Popups.CreateContent] && (
        <Suspense>
          <CreateContentPopup sports={sports} />
        </Suspense>
      )}
      {popups[Popups.FindUser] && (
        <Suspense>
          <FindUsersPopup />
        </Suspense>
      )}
    </>
  );
}
