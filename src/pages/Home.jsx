import { GetStarted } from "../components/GetStarted";
import { LoginPopup } from "../components/LoginPopup";
import { RegisterPopup } from "../components/RegisterPopup";
import { usePopups } from "../hooks/usePopups";

export const Home = () => {
  const { popups } = usePopups();

  return (
    <>
      <GetStarted />
      {popups.isRegisterPopupOpen && <RegisterPopup />}
      {popups.isLoginPopupOpen && <LoginPopup />}
    </>
  );
};
