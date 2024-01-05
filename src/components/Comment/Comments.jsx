import { CommentInput } from "./CommentInput";
import { ShowComments } from "../Buttons/ShowComments";
import { CommentsContainer } from "./CommentsContainer";
import PropTypes from "prop-types";
import { useState } from "react";

export default function Comments({ postId, comments, setCommentsNumber }) {
  const [postComments, setPostComments] = useState(comments);

  return (
    <>
      <CommentInput postId={postId} setPostComments={setPostComments} />
      <CommentsContainer
        comments={postComments}
        setPostComments={setPostComments}
        setCommentsNumber={setCommentsNumber}
      />
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
  setCommentsNumber: PropTypes.func.isRequired,
};
