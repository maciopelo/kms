import React from "react";
import styles from "./LoginRegisterSwitch.module.scss";
import Text from "../../atoms/Text/Text";
import { Link, useLocation } from "react-router-dom";

const LoginRegisterSwitch = () => {
  const { pathname } = useLocation();

  return (
    <div className={styles.switchWrapper}>
      {/* <Link
        to="/login"
        data-active={pathname === "/login"}
        className={styles.switchTile}
      > */}
      <div className={styles.switchTile}>
        <Text s28 gray fMedium>
          Logowanie
        </Text>
      </div>

      {/* </Link> */}
      {/* <Link
        to="/register"
        data-active={pathname === "/register"}
        className={styles.switchTile}
      >
        <Text s28>Rejestracja</Text>
      </Link> */}
    </div>
  );
};

export default LoginRegisterSwitch;
