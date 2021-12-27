/* eslint-disable no-unused-expressions */

import React from "react";
import styles from "./Text.module.scss";

const Text = (props) => {
  const parseStyleProps = Object.keys(props)
    .map((prop) => (Object.keys(styles).includes(prop) ? styles[prop] : ""))
    .join(" ");

  return (
    <span
      className={parseStyleProps.length > 0 ? parseStyleProps : ""}
      onClick={props.onClick}
    >
      {props.children}
    </span>
  );
};

export default Text;
