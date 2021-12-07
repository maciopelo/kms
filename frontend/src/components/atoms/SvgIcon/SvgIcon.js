import React from "react";
import icons from "../../../assets/icons";
import styles from "./SvgIcon.module.scss";

const SvgIcon = ({ icon, onClick, ...rest }) => {
  return (
    <div className={styles.svgIcon} onClick={onClick} {...rest}>
      {icons[icon]}
    </div>
  );
};

export default SvgIcon;
