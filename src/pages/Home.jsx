import { GetStarted } from "../components/GetStarted";
import { LoginPopup } from "../components/popups/LoginPopup";
import { RegisterPopup } from "../components/popups/RegisterPopup";
import { Popups, usePopups } from "../hooks/usePopups";

export const Home = () => {
  const { popups } = usePopups();

  return (
    <>
      <GetStarted />
      {popups[Popups.Register] && <RegisterPopup />}
      {popups[Popups.Login] && <LoginPopup />}
    </>
  );
};
