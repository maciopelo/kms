import React from "react";
import styles from "./Input.module.scss";
import Text from "../../atoms/Text/Text";

const Input = ({ name, type, touched, error, placeholder, ...rest }) => {
  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        data-invalid={Boolean(error)}
        name={name}
        type={type}
        placeholder={placeholder}
        {...rest}
      />

      <Text s10 gray>
        {placeholder}
      </Text>

      {error && (
        <Text s10 error>
          {error}
        </Text>
      )}
    </div>
  );
};

export default Input;
