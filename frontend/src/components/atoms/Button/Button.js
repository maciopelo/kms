import React from "react";
import Text from "../Text/Text";
import styles from "./Button.module.scss";

const Button = ({ children, type, form = null }) => {
  return (
    <button className={styles.button} type={type} form={form}>
      <Text s16 gray>
        {children}
      </Text>
    </button>
  );
};

export default Button;
