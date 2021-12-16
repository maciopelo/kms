import * as Yup from "yup";

export const registerSchema = Yup.object({
  username: Yup.string()
    .max(30)
    .required("to pole jest wymagane"),

  name: Yup.string()
    .max(30)
    .required("to pole jest wymagane"),

  surname: Yup.string()
    .max(50)
    .required("to pole jest wymagane"),

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
  username: Yup.string().required("to pole jest wymagane"),

  password: Yup.string().required("to pole jest wymagane"),
});

export const newsSchema = Yup.object({
  header: Yup.string()
    .required("to pole jest wymagane")
    .max(50),

  description: Yup.string()
    .required("to pole jest wymagane")
    .min(100, "przynajmniej 100 słów"),

  date: Yup.string()
    .required("to pole jest wymagane")
    .matches(
      /^([0-2][0-9]|(3)[0-1])(\.)(((0)[0-9])|((1)[0-2]))(\.)\d{4}$/,
      "dd.mm.rrrr format"
    ),
});

export const childSchema = Yup.object({
  childName: Yup.string().required("to pole jest wymagane"),

  childSurname: Yup.string().required("to pole jest wymagane"),

  birth: Yup.string()
    .required("to pole jest wymagane")
    .matches(
      /^([0-2][0-9]|(3)[0-1])(-)(((0)[0-9])|((1)[0-2]))(-)\d{4}$/,
      "dd-mm-rrrr format"
    ),

  pesel: Yup.string()
    .required("to pole jest wymagane")
    .min(11, "pesel składa sie z 11 znaków")
    .max(11, "pesel składa sie z 11 znaków"),

  startHour: Yup.string()
    .required("to pole jest wymagane")
    .matches(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, "gg:mm"),

  finishHour: Yup.string()
    .required("to pole jest wymagane")
    .matches(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, "gg:mm"),

  street: Yup.string().required("to pole jest wymagane"),

  city: Yup.string().required("to pole jest wymagane"),

  parentOne: Yup.string()
    .required("to pole jest wymagane")
    .matches(/^[a-zA-Z]* [a-zA-Z]*$/, "imię i nazwisko"),

  parentOnePhone: Yup.string().required("to pole jest wymagane"),

  parentTwo: Yup.string()
    .required("to pole jest wymagane")
    .matches(/^[a-zA-Z]* [a-zA-Z]*$/, "imię i nazwisko"),

  parentTwoPhone: Yup.string().required("to pole jest wymagane"),

  personOne: Yup.string(),

  personOneRelationship: Yup.string(),

  personTwo: Yup.string(),

  personTwoRelationship: Yup.string(),

  sicknesses: Yup.string(),

  additionalInfo: Yup.string(),
});
