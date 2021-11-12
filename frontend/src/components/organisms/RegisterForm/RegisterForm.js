import React from "react";
import LoginRegisterSwitch from "../../molecules/LoginRegisterSwitch/LoginRegisterSwitch";
import Input from "../../molecules/Input/Input";
import styles from "../LoginForm/LoginForm.module.scss";
import Button from "../../atoms/Button/Button";
import { useFormik } from "formik";
import { registerSchema } from "../../../validators";

const RegisterForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      login: "",
      nip: "",
      password: "",
    },

    validationSchema: registerSchema,

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
        id="register-form"
      >
        <Input
          name="email"
          type="email"
          placeholder="email"
          error={formik.errors.email}
          touched={formik.touched.email}
          {...formik.getFieldProps("email")}
        />

        <Input
          name="login"
          type="text"
          placeholder="login"
          error={formik.errors.login}
          touched={formik.touched.login}
          {...formik.getFieldProps("login")}
        />

        <Input
          name="nip"
          type="number"
          placeholder="nip/regon"
          error={formik.errors.nip}
          touched={formik.touched.nip}
          {...formik.getFieldProps("nip")}
        />

        <Input
          name="password"
          type="password"
          placeholder="hasło"
          error={formik.errors.password}
          touched={formik.touched.password}
          {...formik.getFieldProps("password")}
        />
      </form>

      <Button form="register-form" type="submit">
        Zarejestruj
      </Button>
    </div>
  );
};

export default RegisterForm;
