import { GetStarted } from "../components/home/GetStarted";
import { LoginPopup } from "../components/popups/authentication/LoginPopup";
import { RegisterPopup } from "../components/popups/authentication/RegisterPopup";
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
