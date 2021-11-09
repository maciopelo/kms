import React from "react";
import LoginRegisterSwitch from "../../molecules/LoginRegisterSwitch/LoginRegisterSwitch";
import Input from "../../molecules/Input/Input";
import styles from "./LoginForm.module.scss";
import Button from "../../atoms/Button/Button";
import { useFormik } from "formik";
import { loginSchema } from "../../../validators";

const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },

    validationSchema: loginSchema,

    onSubmit: (values, errors) => {
      console.log(values);
    },
  });

  return (
    <div className={styles.loginFormWrapper}>
      <LoginRegisterSwitch />
      <form
        className={styles.form}
        onSubmit={formik.handleSubmit}
        id="login-form"
      >
        <Input
          name="login"
          type="text"
          placeholder="login"
          error={formik.errors.login}
          touched={formik.touched.login}
          {...formik.getFieldProps("login")}
        />

        <Input
          name="password"
          type="password"
          placeholder="password"
          error={formik.errors.password}
          touched={formik.touched.password}
          {...formik.getFieldProps("password")}
        />
      </form>

      <Button form="login-form" type="submit">
        Zaloguj
      </Button>
    </div>
  );
};

export default LoginForm;
