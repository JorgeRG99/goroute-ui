import { Button } from "@nextui-org/react";
import PropTypes from "prop-types";
import { useComments } from "../../hooks/useComments";
import { useState } from "react";

export function ShowComments({ setPostComments, postId, numberOfComments }) {
  const [isLoading, setIsLoading] = useState(false);
  const { moreComments } = useComments();
  const [hasMoreComments, setHasMoreComments] = useState(true);

  const handleGetMoreComments = async () => {
    if (hasMoreComments) {
      setIsLoading(true);

      const newCommentsLimit = numberOfComments + 3;

      const newCommentsData = await moreComments(newCommentsLimit, postId);

      setPostComments(newCommentsData.comments);
      setHasMoreComments(newCommentsData.hasMoreComments);

      setIsLoading(false);
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
      isLoading={isLoading ? true : false}
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
