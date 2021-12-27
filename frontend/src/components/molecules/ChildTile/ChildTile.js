import React from "react";
import girl from "../../../assets/images/girl.png";
import boy from "../../../assets/images/boy.png";
import styles from "./ChildTile.module.scss";
import Text from "../../atoms/Text/Text";
import { Link } from "react-router-dom";
import { API } from "../../../api/urls";
import male from "../../../assets/icons/male.svg";
import female from "../../../assets/icons/female.svg";

const ChildTile = ({ child, clickable = true, groups, layout }) => {
  const getChildGroup = () => {
    if (groups) {
      const foundGroup = groups.filter((group) => group.id === child.group);
      if (foundGroup.length > 0) return `gr. ${foundGroup[0].name}`;
      return "";
    }
  };

  console.log(layout);
  return (
    <div
      className={`${styles.childTileWrapper} ${
        child.gender === "M" ? styles.male : ""
      }`}
    >
      {layout && (
        <img
          className={styles.genderIcon}
          data-linear={layout}
          src={child.gender === "M" ? male : female}
          alt="Gender Icon"
        />
      )}
      {clickable && (
        <Link className={styles.childLink} to={`children/${child.id}`} />
      )}
      <div className={styles.childTileInfo}>
        <div className={styles.childTileName}>
          <Text s44 gray fMedium>
            {child.name}
          </Text>
          <Text s44 gray fMedium>
            {child.surname}
          </Text>
        </div>

        <Text s16 gray fMedium>
          {getChildGroup()}
        </Text>
      </div>

      {child.gender === "M" ? (
        <img className={styles.childImage} src={boy} alt="Boy Icon" />
      ) : (
        <img className={styles.childImage} src={girl} alt="Girl Icon" />
      )}
    </div>
  );
};

export default ChildTile;
