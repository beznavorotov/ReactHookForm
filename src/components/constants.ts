export const FORM_FIELDS = {
    FIRST_NAME: "firstName",
    LAST_NAME: "lastName",
    EMAIL: "email",
    PASSWORD: "password",
    BIRTH_DATE: "birthDate",
    ACCEPT_TERMS_AND_CONDITIONS: "acceptTermsAndConditions",
  } as const;
  
  export const ERROR_MESSAGES = {
    REQUIRED: "Це поле обов'язкове",
    EMAIL_INVALID: "Некоректний email",
    PASSWORD_MIN_LENGTH: "Мінімум 10 символів",
    TERMS_REQUIRED: "Необхідно погодитись з умовами",
  };