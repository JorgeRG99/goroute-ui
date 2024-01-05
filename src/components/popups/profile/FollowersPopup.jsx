import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Divider,
} from "@nextui-org/react";
import { Popups, usePopups } from "../../../hooks/usePopups";
import { FollowersCard } from "../../cards/FollowersCard";
import PropTypes from "prop-types";
import { Suspense, lazy } from "react";

const OpenCreateActivityPopup = lazy(() =>
  import("../../Buttons/OpenCreateActivityPopup")
);

export default function FollowersPopup({ followersList }) {
  const { popups, togglePopup } = usePopups();

  return (
    <Modal
      isOpen={popups[Popups.Followers]}
      onClose={() => togglePopup(Popups.Followers)}
      placement="top-center"
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex text-center flex-col">
              Seguidores
            </ModalHeader>
            <Divider />
            <ModalBody className="py-[.5em]">
              {followersList.length !== 0 ? (
                <ul>
                  {followersList?.map((user) => {
                    return (
                      <li key={user.id} className="py-[.5em]">
                        <FollowersCard user={user} onClose={onClose} />
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <Suspense>
                  <span className="flex flex-col items-center gap-[1em] py-[1em]">
                    <p>Aun no tienes seguidores, crea una actividad!</p>
                    <OpenCreateActivityPopup />
                  </span>
                </Suspense>
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
FollowersPopup.propTypes = {
  followersList: PropTypes.array,
};
