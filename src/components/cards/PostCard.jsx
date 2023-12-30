import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  User,
} from "@nextui-org/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Unfold } from "../Buttons/Unfold";
import { Comment } from "../Icons/Comment";
import { Like } from "../Icons/Like";
import { TERTIARY_COLOR } from "../../../config";
import PropTypes from "prop-types";

export function PostCard({ postData }) {
  const [isUnfolded, setIsUnfolded] = useState(false);

  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 w-[80%]"
      shadow="sm"
    >
      <CardHeader className="p-[1.5em]">
        <Link to={`/profile`}>
          <User
            classNames={{
              name: "capitalize text-[.9em] font-semibold",
              description: "text-[.8em]",
              wrapper: "ml-[.8em]",
            }}
            name={`el nombre`}
            description={<p className="text-primary text-[1.1em]">@username</p>}
            avatarProps={{
              isBordered: true,
              size: "lg",
            }}
          />
        </Link>
      </CardHeader>
      <CardBody
        className={`px-9 pt-0 flex gap-[2em] ${!isUnfolded && "h-[6.5em]"}`}
      >
        <h2 className="font-semibold text-[1.2em]">{postData.title}</h2>
        {postData.content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
        <span>
          {postData.tags.map((tag, index) => (
            <Link key={index} className="text-success hover:underline">
              #{tag}
            </Link>
          ))}
        </span>
      </CardBody>
      <CardFooter className="flex items-center justify-between px-9 py-6">
        <span className="flex gap-[.8em]">
          <Like color={TERTIARY_COLOR} />
          <Comment />
        </span>
        <Unfold isUnfolded={isUnfolded} setIsUnfolded={setIsUnfolded} />
      </CardFooter>
    </Card>
  );
}

PostCard.propTypes = {
  postData: PropTypes.object.isRequired,
};
