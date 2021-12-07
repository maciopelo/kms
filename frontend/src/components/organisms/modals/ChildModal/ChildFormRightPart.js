import React from "react";
import styles from "./ChildModal.module.scss";
import Text from "../../../atoms/Text/Text";
import Input from "../../../molecules/Input/Input";
import RadioOrCheckbox from "../../../molecules/RadioOrCheckbox/RadioOrCheckbox";

const ChildFormRightPart = () => {
  return (
    <div className={styles.childModalInputs}>
      <div className={styles.childModalFormSegment}>
        <Text s28 rouge fMedium>
          Choroby, alergie
        </Text>
        <textarea className={styles.textarea} />
      </div>

      <div className={styles.childModalFormSegment}>
        <Text s28 rouge fMedium>
          Dodatkowe informacje
        </Text>
        <textarea className={styles.textarea} />
      </div>
    </div>
  );
};

export default ChildFormRightPart;
