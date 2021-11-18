import React from "react";
import LoginRegisterSwitch from "../../molecules/LoginRegisterSwitch/LoginRegisterSwitch";
import Input from "../../molecules/Input/Input";
import styles from "../LoginForm/LoginForm.module.scss";
import Button from "../../atoms/Button/Button";
import { useFormik } from "formik";
import { registerSchema } from "../../../validators";
import { useAuthContext } from "../../../store/contexts/AuthContext";
import { useHistory } from "react-router";
import Text from "../../atoms/Text/Text";
import { registerUser } from "../../../store/actions";

const RegisterForm = () => {
  let history = useHistory();
  const {
    authState: { error },
    dispatch,
  } = useAuthContext();

  const formik = useFormik({
    initialValues: {
      username: "",
      name: "",
      surname: "",
      email: "",
      password: "",
    },

    validationSchema: registerSchema,

    onSubmit: async (values) => {
      try {
        let response = await registerUser(dispatch, values);
        if (!response) return;
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div className={styles.loginFormWrapper}>
      <LoginRegisterSwitch />
      <form
        className={styles.form}
        onSubmit={formik.handleSubmit}
        id="register-form"
      >
        <Input
          name="username"
          type="text"
          placeholder="login"
          error={formik.errors.username}
          touched={formik.touched.username}
          {...formik.getFieldProps("username")}
        />

        <Input
          name="name"
          type="text"
          placeholder="imię"
          error={formik.errors.name}
          touched={formik.touched.name}
          {...formik.getFieldProps("name")}
        />

        <Input
          name="surname"
          type="text"
          placeholder="nazwisko"
          error={formik.errors.surname}
          touched={formik.touched.surname}
          {...formik.getFieldProps("surname")}
        />

        <Input
          name="email"
          type="email"
          placeholder="email"
          error={formik.errors.email}
          touched={formik.touched.email}
          {...formik.getFieldProps("email")}
        />

        <Input
          name="password"
          type="password"
          placeholder="hasło"
          error={formik.errors.password}
          touched={formik.touched.password}
          {...formik.getFieldProps("password")}
        />

        {error && (
          <Text s16 error>
            {error}
          </Text>
        )}
      </form>

      <Button form="register-form" type="submit">
        Zarejestruj
      </Button>
    </div>
  );
};

export default RegisterForm;
