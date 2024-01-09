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
import OpenFindUsersPopup from "../../Buttons/OpenFindUsersPopup";
import { useRef } from "react";

export default function FollowsPopup({ followsList }) {
  const { popups, togglePopup } = usePopups();
  const followedListRef = useRef([...followsList]);

  return (
    <Modal
      isOpen={popups[Popups.Follows]}
      onClose={() => togglePopup(Popups.Follows)}
      placement="center"
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
                <ul className="flex flex-col gap-5">
                  {followedListRef.current?.map((user) => {
                    return (
                      <li key={user.id}>
                        <FollowActionCard user={user} onClose={onClose} />
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <span className="flex items-center justify-center gap-[1.5em] py-[1em]">
                  <p>Aun no sigues a ningún usuario!</p>
                  <OpenFindUsersPopup />
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
