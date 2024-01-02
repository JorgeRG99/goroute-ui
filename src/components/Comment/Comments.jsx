import { CommentInput } from "./CommentInput";
import { ShowComments } from "../Buttons/ShowComments";
import { CommentsContainer } from "./CommentsContainer";
import PropTypes from "prop-types";
import { useState } from "react";

export default function Comments({ postId, comments }) {
  const [postComments, setPostComments] = useState(comments);

  return (
    <>
      <CommentInput postId={postId} />
      <CommentsContainer comments={postComments} />
      <ShowComments
        setPostComments={setPostComments}
        postId={postId}
        numberOfComments={postComments.length}
      />
    </>
  );
}

Comments.propTypes = {
  postId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
};
