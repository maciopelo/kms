import React from "react";
import Text from "../../atoms/Text/Text";
import loginKids from "../../../assets/images/login-kids.png";
import styles from "./AppNameWithImage.module.scss";

const AppNameWithImage = () => {
  return (
    <div className={styles.wrapper}>
      <Text s96 gray fLight>
        KMS
      </Text>
      <Text s16 gray fMedium>
        Kindergarten Management System
      </Text>
      <img
        draggable="false"
        className={styles.image}
        src={loginKids}
        alt={`Login/Register Hero`}
      />
    </div>
  );
};

export default AppNameWithImage;
