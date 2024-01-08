import { useMemo, useState } from "react";
import { ACTVITY_DESCRIPTION_REGEX, ACTVITY_LOCATION_REGEX, ACTVITY_PARTICPANTS_REGEX, ACTVITY_TITLE_REGEX, EMPTY_VALUES_ERROR, GENERAL_SERVER_ERROR } from "../../../config";

export const useActivityDataValidator = (activityData) => {
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
    if (activityData.name === "") return false;

    return validateTitle(activityData.name) ? false : true;
  }, [activityData.name]);

  const isDescriptionInvalid = useMemo(() => {
    if (activityData.description === "") return false;

    return validateDescription(activityData.description) ? false : true;
  }, [activityData.description]);

  const isParticipantsInvalid = useMemo(() => {
    if (activityData.participants === "") return false;

    return validateParticipants(activityData.participants) ? false : true;
  }, [activityData.participants]);

  const isLocationInvalid = useMemo(() => {
    if (activityData.location === "") return false;

    return validateLocation(activityData.location) ? false : true;
  }, [activityData.location]);

  const isActivityDateInvalid = useMemo(() => {
    if (activityData.day === "") return false;

    return validateActivityDate(activityData.day) ? false : true;
  }, [activityData.day]);

  const catchedServerErrors = (response) => {
    if (response > 499) {
      setServerErrors(GENERAL_SERVER_ERROR)

      return true
    }
  }

  const catchEmptyValues = () => {
    if (Object.values(activityData).some(data => data.length === 0)) {
      setServerErrors(EMPTY_VALUES_ERROR)

      return true;
    }
  }

  return { isTitleInvalid, isDescriptionInvalid, isParticipantsInvalid, isLocationInvalid, isActivityDateInvalid, serverErrors, catchEmptyValues, catchedServerErrors }
}