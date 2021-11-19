import * as Yup from "yup";

export const registerSchema = Yup.object({
  username: Yup.string().max(30).required("to pole jest wymagane"),

  name: Yup.string().max(30).required("to pole jest wymagane"),

  surname: Yup.string().max(50).required("to pole jest wymagane"),

  email: Yup.string()
    .email("email niepoprawny")
    .required("to pole jest wymagane"),

  password: Yup.string().required("to pole jest wymagane"),
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/,
  //   "min 8 znaków, 1 wielka i mala litera, 1 znak specjalny"
  // ),
});

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("niepoprawny email")
    .max(20, "max 20 znaków")
    .required("to pole jest wymagane"),

  password: Yup.string().required("to pole jest wymagane"),
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/,
  //   "min 8 znaków, 1 wielka i mala litera, 1 znak specjalny"
  // ),
});
