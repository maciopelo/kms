import React from "react";
import styles from "./Cross.module.scss";

const Cross = ({ onClick }) => {
  return (
    <div>
      <span className={styles.cross} onClick={onClick} />
    </div>
  );
};

export default Cross;
