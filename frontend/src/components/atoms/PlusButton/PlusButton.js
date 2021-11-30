import React from "react";
import styles from "./PlusButton.module.scss";
import plus from "../../../assets/icons/plus.svg";

const PlusButton = ({ onClick }) => {
  return (
    <div className={styles.wrapper} onClick={onClick}>
      <img src={plus} alt="Plus Icon" />
    </div>
  );
};

export default PlusButton;
