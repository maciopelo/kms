import React from "react";
import Text from "../../atoms/Text/Text";
import styles from "./GroupTile.module.scss";
import { GROUPS } from "../../../utils/enums";
import edit from "../../../assets/icons/edit.svg";

const GroupTile = ({ name, childrenCount, teacher, type }) => {
  return (
    <div className={styles.groupTileWrapper} data-color={type}>
      <div className={styles.groupType}>
        <Text fBold rouge s44>
          {GROUPS[type].name}
        </Text>
      </div>

      <div className={styles.groupInfo}>
        <Text fRegular gray s24>
          dzieci
        </Text>

        <Text fBold gray s24>
          {childrenCount}
        </Text>
      </div>

      <div className={styles.groupInfo}>
        <Text fRegular gray s24>
          nazwa
        </Text>

        <Text fBold gray s24>
          {name}
        </Text>
      </div>

      <div className={styles.groupInfo}>
        <Text fRegular gray s24>
          wychowawca
        </Text>

        <Text fBold gray s24>
          {teacher}
        </Text>
      </div>

      <img className={styles.editGroup} src={edit} alt="Edit Icon" />
    </div>
  );
};

export default GroupTile;
