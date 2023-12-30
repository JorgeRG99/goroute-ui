import { User } from "@nextui-org/user";
import { Link } from "react-router-dom";
import { userInitials } from "../../services/helpers";
import { RemoveParticipant } from "../Buttons/RemoveParticipant";
import PropTypes from "prop-types";

export function RemoveParticipantCard({
  activityId,
  user,
  participants,
  setParticipants,
}) {
  const { id, name, surname, username, avatar } = user;

  return (
    <span className="w-full flex justify-between items-center">
      <Link to={`/${username}`}>
        <User
          name={`${name} ${surname}`}
          description={<p className="text-primary text-[1.1em]">@{username}</p>}
          avatarProps={{
            src: avatar || undefined,
            name: userInitials(name, surname),
            isBordered: true,
          }}
        />
      </Link>
      <RemoveParticipant
        userId={id}
        activityId={activityId}
        participants={participants}
        setParticipants={setParticipants}
      />
    </span>
  );
}

RemoveParticipantCard.propTypes = {
  activityId: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  participants: PropTypes.array.isRequired,
  setParticipants: PropTypes.func.isRequired,
};
