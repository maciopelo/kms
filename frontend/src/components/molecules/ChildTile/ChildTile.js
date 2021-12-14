import React from "react";
import girl from "../../../assets/images/girl.png";
import boy from "../../../assets/images/boy.png";
import styles from "./ChildTile.module.scss";
import Text from "../../atoms/Text/Text";
import { Link } from "react-router-dom";
import { API } from "../../../api/urls";

const ChildTile = ({ child, clickable = true }) => {
  return (
    <div
      className={`${styles.childTileWrapper} ${
        child.gender === "M" ? styles.male : ""
      }`}
    >
      {clickable && (
        <Link className={styles.childLink} to={`children/${child.id}`} />
      )}
      <div className={styles.childTileName}>
        <Text s44 gray fMedium>
          {child.name}
        </Text>
        <Text s44 gray fMedium>
          {child.surname}
        </Text>
      </div>

      {child.gender === "M" ? (
        <img src={boy} alt="Boy Icon" />
      ) : (
        <img src={girl} alt="Girl Icon" />
      )}
    </div>
  );
};

export default ChildTile;
