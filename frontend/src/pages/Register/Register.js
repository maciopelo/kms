import React from "react";
import RegisterForm from "../../components/organisms/RegisterForm/RegisterForm";
import AppNameWithImage from "../../components/molecules/AppNameWithImage/AppNameWithImage";
import styles from "../Login/Login.module.scss";
import { useAuthContext } from "../../store/contexts/AuthContext";
import { Redirect } from "react-router-dom";

const Register = () => {
  const {
    authState: { isLogged },
  } = useAuthContext();

  return !isLogged ? (
    <main className={styles.container}>
      <RegisterForm />
      <AppNameWithImage />
    </main>
  ) : (
    <Redirect to="/home" />
  );
};

export default Register;
