import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Divider,
} from "@nextui-org/react";
import { Popups, usePopups } from "../../../hooks/usePopups";
import { FollowActionCard } from "../../cards/FollowActionCard";
import PropTypes from "prop-types";
import { useRef } from "react";

export function FollowsPopup({ followsList }) {
  const { popups, togglePopup } = usePopups();
  const followedListRef = useRef([...followsList]);

  return (
    <Modal
      isOpen={popups[Popups.Follows]}
      onClose={() => togglePopup(Popups.Follows)}
      placement="top-center"
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex text-center flex-col">
              Seguidos
            </ModalHeader>
            <Divider />
            <ModalBody className="py-[1em]">
              {followedListRef.current.length !== 0 ? (
                followedListRef.current?.map((user) => {
                  return (
                    <FollowActionCard
                      key={user.id}
                      id={user.id}
                      name={user.name}
                      surname={user.surname}
                      username={user.username}
                      avatar={user.avatar}
                      onClose={onClose}
                    />
                  );
                })
              ) : (
                <span className="flex flex-col items-center gap-[1em] py-[1em]">
                  <p>Aun no sigues a ningún usuario!</p>
                </span>
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
FollowsPopup.propTypes = {
  followsList: PropTypes.array,
};
