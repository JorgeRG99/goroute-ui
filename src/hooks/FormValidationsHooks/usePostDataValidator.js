import { useMemo, useState } from "react";
import { EMPTY_VALUES_ERROR, GENERAL_SERVER_ERROR, POST_CONTENT_REGEX, POST_TAGS_REGEX, POST_TITLE_REGEX } from "../../../config";

export const usePostDataValidator = (postData) => {
    const [serverErrors, setServerErrors] = useState();
    const validateTitle = (value) => value.match(POST_TITLE_REGEX);
    const validateContent = (value) => value.match(POST_CONTENT_REGEX);
    const validateTags = (value) => value.match(POST_TAGS_REGEX);

    const isTitleInvalid = useMemo(() => {
        if (postData.title === "") return false;

        return validateTitle(postData.title) ? false : true;
    }, [postData.title]);

    const isContentInvalid = useMemo(() => {
        if (postData.content === "") return false;

        return validateContent(postData.content) ? false : true;
    }, [postData.content]);

    const isTagsInvalid = useMemo(() => {
        if (postData.tags === "") return false;

        return validateTags(postData.tags) ? false : true;
    }, [postData.tags]);

    const catchedServerErrors = (response) => {
        if (response > 499) {
            setServerErrors(GENERAL_SERVER_ERROR)

            return true
        }
    }

    const catchEmptyValues = () => {
        if (Object.values(postData).some(data => data.length === 0)) {
            setServerErrors(EMPTY_VALUES_ERROR)

            return true;
        }
    }

    return { isTitleInvalid, isContentInvalid, isTagsInvalid, serverErrors, catchEmptyValues, catchedServerErrors }
}