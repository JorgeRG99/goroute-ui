import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import { Popups, usePopups } from "../../../hooks/usePopups";
import { FollowersCard } from "../../cards/FollowersCard";
import { useFollowers } from "../../../hooks/useFollowers";
import PropTypes from "prop-types";

export function FollowersPopup({ followersList }) {
  const { popups, togglePopup } = usePopups();
  const { followersDataList } = useFollowers({ followersList });

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
              {followersDataList?.map((user) => {
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
              })}
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
