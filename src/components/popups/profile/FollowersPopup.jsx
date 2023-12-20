import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import { Popups, usePopups } from "../../../hooks/usePopups";
import { FollowersCard } from "../../cards/FollowersCard";
import PropTypes from "prop-types";
import { CreateActivity } from "../../buttons/CreateActivity";

export function FollowersPopup({ followersList }) {
  const { popups, togglePopup } = usePopups();

  return (
    <Modal
      isOpen={popups[Popups.Followers]}
      onClose={() => togglePopup(Popups.Followers)}
      placement="top-center"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex text-center flex-col">
              Seguidores
            </ModalHeader>
            <ModalBody>
              {followersList.length !== 0 ? (
                followersList?.map((user) => {
                  return (
                    <FollowersCard
                      key={user.id}
                      name={user.name}
                      surname={user.surname}
                      username={user.username}
                      id={user.id}
                      avatar={user.avatar}
                      onClose={onClose}
                    />
                  );
                })
              ) : (
                <span className="flex flex-col items-center gap-[1em] pb-[1em]">
                  <p>Aun no tienes seguidores, crea tu una actividad!</p>
                  <CreateActivity />
                </span>
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
