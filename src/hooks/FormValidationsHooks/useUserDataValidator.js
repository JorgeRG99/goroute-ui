import { useMemo, useState } from "react";
import { BIOGRAPHY_REGEX, EMAIL_REGEX, EMPTY_VALUES_ERROR, GENERAL_SERVER_ERROR, NAME_SURNAME_REGEX, PASSWORD_REGEX, USERNAME_REGEX } from "../../../config";

export const useUserDataValidator = (userData) => {
    const [serverErrors, setServerErrors] = useState();
    const validateUsername = (value) => value.match(USERNAME_REGEX);
    const validateEmail = (value) => value.match(EMAIL_REGEX);
    const validateNameSurname = (value) => value.match(NAME_SURNAME_REGEX);
    const validatePassword = (value) => value.match(PASSWORD_REGEX);
    const validatePasswordConfirm = (value) => value === userData.password;
    const validateBiography = (value) => value.match(BIOGRAPHY_REGEX);
    const validateBirthDate = (value) => {
        const birthDate = new Date(value);
        const currentDate = new Date();
        const minAge = 5;

        const minBirthDate = new Date(
            currentDate.getFullYear() - minAge,
            currentDate.getMonth(),
            currentDate.getDate()
        );

        return birthDate <= minBirthDate;
    }

    const isUsernameInvalid = useMemo(() => {
        if (userData.username === "") return false;

        return validateUsername(userData.username) ? false : true;
    }, [userData.username]);

    const isEmailInvalid = useMemo(() => {
        if (userData.email === "") return false;

        if (userData.email) return validateEmail(userData.email) ? false : true;
    }, [userData.email]);

    const isNameInvalid = useMemo(() => {
        if (userData.name === "") return false;

        return validateNameSurname(userData.name) ? false : true;
    }, [userData.name]);

    const isSurnameInvalid = useMemo(() => {
        if (userData.surname === "") return false;

        return validateNameSurname(userData.surname) ? false : true;
    }, [userData.surname]);

    const isPasswordInvalid = useMemo(() => {
        if (userData.password === "") return false;

        if (userData.password) return validatePassword(userData.password) ? false : true;
    }, [userData.password]);

    const isPasswordConfirmInvalid = useMemo(() => {
        if (userData.passwordConfirm === "") return false;

        if (userData.passwordConfirm) return validatePasswordConfirm(userData.passwordConfirm) ? false : true;
    }, [userData.passwordConfirm]);

    const isBirthDateInvalid = useMemo(() => {
        if (userData.birth === "") return false;

        if (userData.birth) return validateBirthDate(userData.birth) ? false : true;
    }, [userData.birth]);

    const isBiographyInvalid = useMemo(() => {
        if (userData.biography === "") return false;

        if (userData.biography) return validateBiography(userData.biography) ? false : true;
    }, [userData.biography]);

    const catchedServerErrors = (response) => {
        if (response > 499) {
            setServerErrors(GENERAL_SERVER_ERROR)

            return true
        }
    }

    const catchEmptyValues = () => {
        if (Object.entries(userData).some(([key, value]) => key !== "biography" && value.length === 0)) {
            setServerErrors(EMPTY_VALUES_ERROR);
            return true;
        }
    }

    return { isUsernameInvalid, isEmailInvalid, isNameInvalid, isSurnameInvalid, isPasswordInvalid, isPasswordConfirmInvalid, isBirthDateInvalid, isBiographyInvalid, catchedServerErrors, serverErrors, catchEmptyValues }
}
