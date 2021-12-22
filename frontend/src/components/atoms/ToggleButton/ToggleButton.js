import React from "react";
import { useThemeContext } from "../../../store/contexts/ThemeContext";
import styles from "./ToggleButton.module.scss";

const ToggleButton = () => {
  const { darkTheme, toggleTheme } = useThemeContext();
  return (
    <div className={styles.toggleWrapper}>
      <input
        type="checkbox"
        name="toggle"
        className={styles.mobileToggle}
        id="toggle"
        onChange={toggleTheme}
        checked={darkTheme}
      />
      <label htmlFor="toggle" />
    </div>
  );
};

export default ToggleButton;
