import React from "react";
import Text from "../../atoms/Text/Text";
import styles from "./RadioOrCheckbox.module.scss";

const RadioOrCheckbox = ({ type, id, checked, text, onChange }) => {
  return (
    <label htmlFor={id} className={styles.checkboxOrRadioContainer}>
      <input
        className={styles.input}
        type={type}
        id={id}
        checked={checked}
        value={id}
        onChange={onChange}
      />
      <Text s16 fRegular gray>
        {text}
      </Text>
    </label>
  );
};

export default RadioOrCheckbox;
