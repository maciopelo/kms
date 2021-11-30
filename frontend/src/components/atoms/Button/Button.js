import React from "react";
import Text from "../Text/Text";
import styles from "./Button.module.scss";

const Button = ({ children, type, form = null, onClick }) => {
  return (
    <button className={styles.button} type={type} form={form} onClick={onClick}>
      <Text s16 gray>
        {children}
      </Text>
    </button>
  );
};

export default Button;
