import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { Popups, usePopups } from "../../../hooks/usePopups";
import debounce from "just-debounce-it";
import { Search } from "../../Icons/Search";
import { Input, Spinner } from "@nextui-org/react";
import { findUserByPartialUsername } from "../../../services/user";
import { useUserSessionStore } from "../../../store/userSession";
import { useEffect, useState } from "react";
import { UsersFoundList } from "./UsersFoundList";
import { useSuggestedUsersList } from "../../../hooks/useSuggestedUsersList";

export default function FindUsersPopup() {
  const { popups, togglePopup } = usePopups();
  const { usersList } = useSuggestedUsersList("Activity");
  const [usersFoundedList, setUsersFoundedList] = useState(usersList);
  const [isLoading, setIsLoading] = useState(false);
  const authToken = useUserSessionStore((state) => state.authToken);

  useEffect(() => {
    if (usersList) setUsersFoundedList(usersList);
  }, [usersList]);

  const onValueChangeDebounced = debounce(async (value) => {
    try {
      setIsLoading(true);
      const usersFound = await findUserByPartialUsername(authToken, value);

      setUsersFoundedList(usersFound);
    } catch (error) {
      throw new Error(`Error obteniendo usuarios ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }, 200);

  return (
    <Modal
      isOpen={popups[Popups.FindUser]}
      onClose={() => togglePopup(Popups.FindUser)}
      placement="center"
      scrollBehavior="inside"
      backdrop="blur"
      size="md"
      classNames={{ body: "min-h-[25em] max-h-[25em]" }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex text-center flex-col mt-[1em]">
              Encuentra compañeros para tus actividades
            </ModalHeader>
            <ModalBody className="pt-[1em] pb-[1.5em] flex flex-col gap-[1em] items-center">
              <Input
                radius="xl"
                type="text"
                size="xs"
                placeholder="Busca un nombre de usuario..."
                variant="faded"
                onValueChange={onValueChangeDebounced}
                endContent={<Search />}
              />
              {isLoading && <Spinner />}
              <UsersFoundList
                foundedUsersList={usersFoundedList}
                onClose={onClose}
              />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
