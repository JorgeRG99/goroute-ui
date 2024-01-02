import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
import { Avatar } from "@nextui-org/react";
import { formatActivityDate, userInitials } from "../../services/helpers";

export function CommentsContainer({ comments }) {
  return (
    <ul className="px-3 py-8 flex flex-col gap-[1em] w-[90%]">
      {comments?.map((comment) => (
        <li key={comment.id} className="w-full flex gap-[1em]">
          <Avatar
            src={comment.user.avatar || undefined}
            size="sm"
            name={userInitials(comment.user.name, comment.user.surname)}
            isBordered
          />
          <div className="px-[.8em] pt-[.5em] pb-[.8em] bg-success-light w-[95%] rounded-b-md rounded-tr-md flex flex-col gap-[1em]">
            <div className="flex justify-between">
              <span>
                <h3 className="text-[.8em] font-semibold">{`${comment.user.name} ${comment.user.surname}`}</h3>
                <h4 className="text-[.8em] text-primary">
                  {comment.user.username}
                </h4>
              </span>
              <p className="text-[.7em]">
                {formatActivityDate(comment.created_at.slice(0, 10))}
              </p>
            </div>
            <ul className="flex flex-col gap-[.6em]">
              {comment.content.map((paragraph) => (
                <li key={uuidv4()} className="text-[.8em]">
                  <p>{paragraph}</p>
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
}

CommentsContainer.propTypes = {
  comments: PropTypes.array.isRequired,
};
