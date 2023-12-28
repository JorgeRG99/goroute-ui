import { GetStarted } from "../components/home/GetStarted";
import { Popups, usePopups } from "../hooks/usePopups";
import { lazy, Suspense } from "react";

const LoginPopup = lazy(() =>
  import("../components/popups/authentication/LoginPopup")
);
const RegisterPopup = lazy(() =>
  import("../components/popups/authentication/RegisterPopup")
);

export default function Home() {
  const { popups } = usePopups();

  return (
    <>
      <GetStarted />
      {popups[Popups.Register] && (
        <Suspense fallback={<h1>...</h1>}>
          <RegisterPopup />
        </Suspense>
      )}
      {popups[Popups.Login] && (
        <Suspense fallback={<h1>...</h1>}>
          <LoginPopup />
        </Suspense>
      )}
    </>
  );
}
