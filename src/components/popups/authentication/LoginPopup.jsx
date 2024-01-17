import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Checkbox,
  Input,
} from "@nextui-org/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail } from "../../icons/Mail";
import { EyeFilledSlash } from "../../icons/EyeFilledSlash";
import { EyeFilled } from "../../icons/EyeFilled";
import { Popups, usePopups } from "../../../hooks/usePopups";
import { useUserSessionStore } from "../../../store/userSession";
import { useUserActivitiesStore } from "../../../store/userActivities";
import { useUserPostsStore } from "../../../store/userPosts";
import { useLoginFormValidator } from "../../../hooks/FormValidationsHooks/useLoginFormValidator";
import { useSportsStore } from "../../../store/sports";

export default function LoginPopup() {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const login = useUserSessionStore((state) => state.login);
  const setUserActivities = useUserActivitiesStore(
    (state) => state.setUserActivities
  );
  const setUserPosts = useUserPostsStore((state) => state.setUserPosts);
  const setSports = useSportsStore((state) => state.setSports);
  const { popups, togglePopup } = usePopups();
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const toggleVisibility = () => setIsVisible(!isVisible);
  const { catchEmptyValues, catchedServerErrors, serverErrors } =
    useLoginFormValidator(userCredentials);

  const handleUserLogin = async () => {
    setIsLoading(true);
    const catchedEmptyData = catchEmptyValues();

    if (!catchedEmptyData) {
      const response = await login(userCredentials);
      const errorOcurred = catchedServerErrors(response);

      if (!errorOcurred) {
        setUserActivities();
        setUserPosts();
        setSports();
        togglePopup(Popups.Login);
      }
      setIsLoading(false);
    }

    setIsLoading(false);
  };

  const handleCredentialsChange = (e) => {
    setUserCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Modal
      isOpen={popups[Popups.Login]}
      onClose={() => togglePopup(Popups.Login)}
      placement="center"
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Accede a tu cuenta
            </ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                endContent={
                  <Mail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Correo electrónico"
                variant="bordered"
                name="email"
                autoComplete="email"
                onChange={handleCredentialsChange}
              />
              <Input
                label="Contraseña"
                type={isVisible ? "text" : "password"}
                name="password"
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeFilledSlash className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilled className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                variant="bordered"
                onChange={handleCredentialsChange}
              />
              <div className="flex py-2 px-1 justify-between">
                <Checkbox
                  classNames={{
                    label: "text-small",
                  }}
                >
                  Recordar
                </Checkbox>
                <Link
                  color="primary"
                  className="text-[#1C64F2]"
                  href="#"
                  size="sm"
                >
                  Olvidaste tu contraseña?
                </Link>
              </div>
            </ModalBody>
            <ModalFooter className="pt-[1em] flex flex-col gap-[2em]">
              {serverErrors && (
                <p className="text-danger text-[.85em]">{serverErrors}</p>
              )}
              <div className="flex gap-[1em] justify-end">
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cerrar
                </Button>
                <Button
                  color="primary"
                  onPress={handleUserLogin}
                  isLoading={isLoading ? true : false}
                >
                  Acceder
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
