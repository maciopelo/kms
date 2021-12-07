import React from "react";
import styles from "./Input.module.scss";
import Text from "../../atoms/Text/Text";
import findIcon from "../../../assets/icons/find.svg";

const icons = {
  find: findIcon,
};

const Input = ({
  name,
  type,
  touched,
  error,
  placeholder,
  kind,
  icon,
  ...rest
}) => {
  return (
    <div className={styles.wrapper}>
      <input
        className={`${styles.input} ${kind ? styles[kind] : ""}`}
        data-invalid={Boolean(error) && Boolean(touched)}
        name={name}
        type={type}
        placeholder={placeholder}
        {...rest}
      />

      <Text s10 gray>
        {placeholder}
      </Text>

      {error && touched && (
        <Text s10 error>
          {error}
        </Text>
      )}
      {icons[icon] && (
        <img
          className={icon ? styles[icon] : ""}
          src={icons[icon]}
          alt="Find Icon"
        />
      )}
    </div>
  );
};

export default Input;
