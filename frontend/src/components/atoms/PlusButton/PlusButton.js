import React from "react";
import styles from "./PlusButton.module.scss";
import SvgIcon from "../SvgIcon/SvgIcon";

const PlusButton = ({ onClick }) => {
  return (
    <div className={styles.wrapper} onClick={onClick}>
      <SvgIcon icon="plus" />
    </div>
  );
};

export default PlusButton;
