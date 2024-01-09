import { useMemo, useState } from "react";
import { EMPTY_VALUES_ERROR, GENERAL_SERVER_ERROR, POST_COMMENT_REGEX } from "../../../config"

export const useCommentValidator = (comment) => {
    const [serverErrors, setServerErrors] = useState();
    const validateComment = (value) => value.match(POST_COMMENT_REGEX);

    const isCommentInvalid = useMemo(() => {
        if (comment === "") return false;

        return validateComment(comment) ? false : true;
    }, [comment]);

    const catchedServerErrors = (response) => {
        if (response > 499) {
            setServerErrors(GENERAL_SERVER_ERROR)

            return true
        }
    }

    const catchEmptyValues = () => {
        if (comment === "") {
            setServerErrors(EMPTY_VALUES_ERROR)

            return true;
        }
    }

  return {isCommentInvalid, serverErrors, catchEmptyValues, catchedServerErrors}
}
