import React from "react";
import styles from "./ChildModal.module.scss";
import Text from "../../../atoms/Text/Text";
import Input from "../../../molecules/Input/Input";
import RadioOrCheckbox from "../../../molecules/RadioOrCheckbox/RadioOrCheckbox";

const ChildFormRightPart = ({ formik }) => {
  return (
    <div className={styles.childModalInputs}>
      <div className={styles.childModalFormSegment}>
        <Text s28 rouge fMedium>
          Choroby, alergie
        </Text>
        <textarea
          className={styles.textarea}
          id="sicknesses"
          name="sicknesses"
          type="text"
          {...formik.getFieldProps("sicknesses")}
        />
      </div>

      <div className={styles.childModalFormSegment}>
        <Text s28 rouge fMedium>
          Dodatkowe informacje
        </Text>
        <textarea
          className={styles.textarea}
          id="additionalInfo"
          name="additionalInfo"
          type="text"
          {...formik.getFieldProps("additionalInfo")}
        />
      </div>
    </div>
  );
};

export default ChildFormRightPart;
