import { Popups, usePopups } from "../../hooks/usePopups";
import { useSports } from "../../hooks/useSports";
import LogoutPopup from "./authentication/LogoutPopup";
import { CreateContentPopup } from "./createContent/CreateContentPopup";

export function GlobalPopups() {
  const { popups } = usePopups();
  const { sports } = useSports();

  return (
    <>
      {popups[Popups.Logout] && <LogoutPopup />}
      {popups[Popups.CreateContent] && <CreateContentPopup sports={sports} />}
    </>
  );
}
