import * as Yup from "yup";

export const registerSchema = Yup.object({
  email: Yup.string()
    .email("email niepoprawny")
    .required("to pole jest wymagane"),

  login: Yup.string()
    .max(20, "max 20 znaków")
    .required("to pole jest wymagane"),

  kindergartenName: Yup.string()
    .max(40, "max 40 znaków")
    .required("to pole jest wymagane"),

  nip: Yup.number("błędny format nip")
    .max(10, "nip składa się z 10 cyfr")
    .required("to pole jest wymagane")
    .positive("błędny format nip"),

  password: Yup.string()
    .required("to pole jest wymagane")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/,
      "min 8 znaków, 1 wielka i mala litera, 1 znak specjalny"
    ),
});

export const loginSchema = Yup.object({
  login: Yup.string()
    .max(20, "max 20 znaków")
    .required("to pole jest wymagane"),

  password: Yup.string()
    .required("to pole jest wymagane")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/,
      "min 8 znaków, 1 wielka i mala litera, 1 znak specjalny"
    ),
});
