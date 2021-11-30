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
    .required("to pole jest wymagane"),

  password: Yup.string().required("to pole jest wymagane"),
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/,
  //   "min 8 znaków, 1 wielka i mala litera, 1 znak specjalny"
  // ),
});

export const newsSchema = Yup.object({
  header: Yup.string().required("to pole jest wymagane"),

  description: Yup.string()
    .required("to pole jest wymagane")
    .min(100, "przynajmniej 100 słów"),

  date: Yup.string()
    .required("to pole jest wymagane")
    .matches(
      /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
      "dd/mm/rrrr format"
    ),
});
