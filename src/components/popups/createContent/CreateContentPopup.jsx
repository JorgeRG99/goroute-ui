import { Modal, ModalContent, ModalHeader, Tab, Tabs } from "@nextui-org/react";
import { Popups, usePopups } from "../../../hooks/usePopups";
import { CreateActivityForm } from "../activity/CreateActivityForm";

export default function CreateContentPopup() {
  const { popups, togglePopup } = usePopups();

  return (
    <Modal
      isOpen={popups[Popups.CreateContent]}
      onClose={() => togglePopup(Popups.CreateContent)}
      placement="top-center"
      classNames={{ base: "flex flex-col items-center" }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-center">
              Publicar
            </ModalHeader>
            <Tabs
              classNames={{
                panel: "w-full",
                base: "w-[90%]",
                tabList: "w-full",
                tabContent: "group-data-[selected=true]:text-primary",
              }}
              aria-label="Options"
            >
              <Tab key="activity" title="Crear actividad">
                <CreateActivityForm onClose={onClose} />
              </Tab>
              <Tab key="post" title="Crear publicacion"></Tab>
            </Tabs>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
