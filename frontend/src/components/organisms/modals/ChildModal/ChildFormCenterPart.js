import React from "react";
import styles from "./ChildModal.module.scss";
import Text from "../../../atoms/Text/Text";
import Input from "../../../molecules/Input/Input";

const ChildFormCenterPart = ({ formik }) => {
  return (
    <div className={styles.childModalInputs}>
      <div className={styles.childModalFormSegment}>
        <Text s28 rouge fMedium>
          Rodzice
        </Text>
        <Input
          id="parentOne"
          name="parentOne"
          type="text"
          placeholder="imię i nazwisko"
          error={formik.errors.parentOne}
          touched={formik.touched.parentOne}
          {...formik.getFieldProps("parentOne")}
        />
        <Input
          id="parentOnePhone"
          name="parentOnePhone"
          type="number"
          placeholder="telefon"
          error={formik.errors.parentOnePhone}
          touched={formik.touched.parentOnePhone}
          {...formik.getFieldProps("parentOnePhone")}
        />

        <Input
          id="parentTwo"
          name="parentTwo"
          type="text"
          placeholder="imię i nazwisko"
          error={formik.errors.parentTwo}
          touched={formik.touched.parentTwo}
          {...formik.getFieldProps("parentTwo")}
        />
        <Input
          id="parentTwoPhone"
          name="parentTwoPhone"
          type="number"
          placeholder="telefon"
          error={formik.errors.parentTwoPhone}
          touched={formik.touched.parentTwoPhone}
          {...formik.getFieldProps("parentTwoPhone")}
        />
      </div>

      <div className={styles.childModalFormSegment}>
        <Text s28 rouge fMedium>
          Osoby upoważnione do odbioru
        </Text>
        <Input
          id="personOne"
          name="personOne"
          type="text"
          placeholder="imię i nazwisko"
          error={formik.errors.personOne}
          touched={formik.touched.personOne}
          {...formik.getFieldProps("personOne")}
        />
        <Input
          id="personOneRelationship"
          name="personOneRelationship"
          type="text"
          placeholder="pokrewieństwo"
          error={formik.errors.personOneRelationship}
          touched={formik.touched.personOneRelationship}
          {...formik.getFieldProps("personOneRelationship")}
        />

        <Input
          id="personTwo"
          name="personTwo"
          type="text"
          placeholder="imię i nazwisko"
          error={formik.errors.personTwo}
          touched={formik.touched.personTwo}
          {...formik.getFieldProps("personTwo")}
        />
        <Input
          id="personTwoRelationship"
          name="personTwoRelationship"
          type="text"
          placeholder="pokrewieństwo"
          error={formik.errors.personTwoRelationship}
          touched={formik.touched.personTwoRelationship}
          {...formik.getFieldProps("personTwoRelationship")}
        />
      </div>
    </div>
  );
};

export default ChildFormCenterPart;
