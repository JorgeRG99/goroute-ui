import { useState } from "react";
import { EMPTY_VALUES_ERROR, GENERAL_SERVER_ERROR, INVALID_CREDENTIALS_ERROR, USER_NOT_FOUND_ERROR } from "../../../config";

export const useLoginFormValidator = (userCredentials) => {
    const [serverErrors, setServerErrors] = useState();

    const catchedServerErrors = (response) => {
        if (response === 404)  {
            setServerErrors(USER_NOT_FOUND_ERROR)

            return true
        } else if (response === 401)  {
            setServerErrors(INVALID_CREDENTIALS_ERROR)

            return true
        } else if(response > 499) {
            setServerErrors(GENERAL_SERVER_ERROR)

            return true
        }
    }

    const catchEmptyValues = () => {
        if (Object.values(userCredentials).some(data => data.length === 0)) {
            setServerErrors(EMPTY_VALUES_ERROR)

            return true;
        }
    }
  return { catchedServerErrors, catchEmptyValues, serverErrors}
}
