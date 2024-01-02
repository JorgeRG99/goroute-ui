import { Button } from "@nextui-org/react";
import PropTypes from "prop-types";
import { useComments } from "../../hooks/useComments";
import { useState } from "react";

export function ShowComments({ setPostComments, postId, numberOfComments }) {
  const { moreComments } = useComments();
  const [hasMoreComments, setHasMoreComments] = useState(true);

  const handleGetMoreComments = async () => {
    if (hasMoreComments) {
      const newCommentsLimit = numberOfComments + 3;

      const newCommentsData = await moreComments(newCommentsLimit, postId);

      setPostComments(newCommentsData.comments);
      setHasMoreComments(newCommentsData.hasMoreComments);
    } else {
      setPostComments([]);
      setHasMoreComments(true);
    }
  };

  return (
    <Button
      size="sm"
      onPress={handleGetMoreComments}
      color={hasMoreComments ? "primary" : "danger"}
      variant="flat"
    >
      {hasMoreComments ? "Mostrar comentarios" : "Ocultar comentarios"}
    </Button>
  );
}

ShowComments.propTypes = {
  setPostComments: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  numberOfComments: PropTypes.number.isRequired,
};
