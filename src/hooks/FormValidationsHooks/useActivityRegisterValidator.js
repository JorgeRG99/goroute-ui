import { useMemo, useState } from "react";
import { ACTVITY_DESCRIPTION_REGEX, ACTVITY_LOCATION_REGEX, ACTVITY_PARTICPANTS_REGEX, ACTVITY_TITLE_REGEX, EMPTY_VALUES_ERROR, GENERAL_SERVER_ERROR } from "../../../config";

export const useActivityRegisterValidator = (activityRegisterData) => {
  const [serverErrors, setServerErrors] = useState();
  const validateTitle = (value) => value.match(ACTVITY_TITLE_REGEX);
  const validateDescription = (value) => value.match(ACTVITY_DESCRIPTION_REGEX);
  const validateParticipants = (value) => value.match(ACTVITY_PARTICPANTS_REGEX);
  const validateLocation = (value) => value.match(ACTVITY_LOCATION_REGEX);
  const validateActivityDate = (value) => {
    const newActivityUnixDate = new Date(value).getTime();
    const actualUnixDate = new Date().getTime();

    return newActivityUnixDate > actualUnixDate;
  }

  const isTitleInvalid = useMemo(() => {
    if (activityRegisterData.name === "") return false;

    return validateTitle(activityRegisterData.name) ? false : true;
  }, [activityRegisterData.name]);

  const isDescriptionInvalid = useMemo(() => {
    if (activityRegisterData.description === "") return false;

    return validateDescription(activityRegisterData.description) ? false : true;
  }, [activityRegisterData.description]);

  const isParticipantsInvalid = useMemo(() => {
    if (activityRegisterData.participants === "") return false;

    return validateParticipants(activityRegisterData.participants) ? false : true;
  }, [activityRegisterData.participants]);

  const isLocationInvalid = useMemo(() => {
    if (activityRegisterData.location === "") return false;

    return validateLocation(activityRegisterData.location) ? false : true;
  }, [activityRegisterData.location]);

  const isActivityDateInvalid = useMemo(() => {
    if (activityRegisterData.day === "") return false;

    return validateActivityDate(activityRegisterData.day) ? false : true;
  }, [activityRegisterData.day]);

  const catchedServerErrors = (response) => {
    if (response > 499) {
      setServerErrors(GENERAL_SERVER_ERROR)

      return true
    }
  }

  const catchEmptyValues = () => {
    if (Object.values(activityRegisterData).some(data => data.length === 0)) {
      setServerErrors(EMPTY_VALUES_ERROR)

      return true;
    }
  }

  return { isTitleInvalid, isDescriptionInvalid, isParticipantsInvalid, isLocationInvalid, isActivityDateInvalid, serverErrors, catchEmptyValues, catchedServerErrors }
}