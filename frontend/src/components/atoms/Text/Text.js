/* eslint-disable no-unused-expressions */

import React from "react";
import styles from "./Text.module.scss";

function Text(props) {
  const parseStyleProps = Object.keys(props)
    .map((prop) => (Object.keys(styles).includes(prop) ? styles[prop] : ""))
    .join(" ");

  return (
    <span className={parseStyleProps.length > 0 ? parseStyleProps : ""}>
      {props.children}
    </span>
  );
}

export default Text;
