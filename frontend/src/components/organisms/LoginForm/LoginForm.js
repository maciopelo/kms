import React from "react";
import LoginRegisterSwitch from "../../molecules/LoginRegisterSwitch/LoginRegisterSwitch";
import Input from "../../molecules/Input/Input";
import Text from "../../atoms/Text/Text";
import styles from "./LoginForm.module.scss";
import Button from "../../atoms/Button/Button";
import { useFormik } from "formik";
import { loginSchema } from "../../../validators";
import { useAuthContext } from "../../../store/contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { loginUser } from "../../../store/actions";

const LoginForm = () => {
  let history = useHistory();
  const {
    authState: { error },
    dispatch,
  } = useAuthContext();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validationSchema: loginSchema,

    onSubmit: async (values) => {
      try {
        let response = await loginUser(dispatch, values);
        if (!response) return;
        history.push("/home");
      } catch (err) {
        console.log(err);
      }
    },
  });
  console.log(formik.errors);
  return (
    <div className={styles.loginFormWrapper}>
      <LoginRegisterSwitch />
      <form
        className={styles.form}
        onSubmit={formik.handleSubmit}
        id="login-form"
      >
        <Input
          name="username"
          type="text"
          placeholder="użytkownik"
          error={formik.errors.username}
          touched={formik.touched.username}
          {...formik.getFieldProps("username")}
        />

        <Input
          name="password"
          type="password"
          placeholder="password"
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

      <Button form="login-form" type="submit">
        Zaloguj
      </Button>
    </div>
  );
};

export default LoginForm;
