import {
  Avatar,
  AvatarGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import PropTypes from "prop-types";
import { userInitials } from "../../services/helpers";
import { UserSmallCard } from "./UserSmallCard";

export function ActivityMembers({ participants }) {
  return (
    <Dropdown shouldBlockScroll={false} placement="bottom-end">
      <DropdownTrigger className="cursor-pointer">
        <AvatarGroup max={1} total={participants.length} isBordered>
          <Avatar
            name={userInitials(participants[0].name, participants[0].surname)}
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          />
        </AvatarGroup>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Profile Actions"
        classNames={{ base: "max-h-[22em] overflow-scroll" }}
        variant="flat"
      >
        {participants.map((user) => {
          return (
            <DropdownItem
              classNames={{
                base: "flex justify-center items-center",
              }}
              key={user.username}
              className="h-14 gap-2 p-0"
            >
              <UserSmallCard user={user} />
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
}

ActivityMembers.propTypes = {
  participants: PropTypes.array.isRequired,
};
