import * as yup from "yup";

export const schema = yup.object().shape({
  firstName: yup
    .string()
    .max(20, "Максимум 20 літер")
    .required("Це поле обов'язкове"),
  lastName: yup
    .string()
    .max(20, "Максимум 20 літер")
    .required("Це поле обов'язкове"),
  email: yup
    .string()
    .email("Некоректний email")
    .required("Це поле обов'язкове"),
  password: yup
    .string()
    .min(10, "Мінімум 10 символів")
    .required("Це поле обов'язкове"),
  birthDate: yup.date().required("Оберіть дату народження").nullable(),
  acceptTermsAndConditions: yup
    .boolean()
    .oneOf([true], "Необхідно погодитись з умовами")
    .required("Це поле обов'язкове"),
});