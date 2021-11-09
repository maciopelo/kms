import React from "react";
import RegisterForm from "../../components/organisms/RegisterForm/RegisterForm";
import AppNameWithImage from "../../components/molecules/AppNameWithImage/AppNameWithImage";
import styles from "../Login/Login.module.scss";

const Register = () => {
  return (
    <main className={styles.container}>
      <RegisterForm />
      <AppNameWithImage />
    </main>
  );
};

export default Register;
