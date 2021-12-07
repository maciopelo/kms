import React, { useState } from "react";
import { useModalContext } from "../../../../store/contexts/ModalContext";
import Cross from "../../../atoms/Cross/Cross";
import Input from "../../../molecules/Input/Input";
import styles from "./ChildModal.module.scss";
import Button from "../../../atoms/Button/Button";
import ChildFormLeftPart from "./ChildFormLeftPart";
import ChildFormCenterPart from "./ChildFormCenterPart";
import ChildFormRightPart from "./ChildFormRightPart";
import { useFormik } from "formik";
import { childSchema } from "../../../../validators";
import SvgIcon from "../../../atoms/SvgIcon/SvgIcon";

const ChildModal = () => {
  const { handleModal } = useModalContext();

  const [childGender, setChosenGender] = useState("M");
  const [meals, setMeals] = useState({
    breakfast: false,
    dinner: false,
    supper: false,
  });

  const formik = useFormik({
    initialValues: {
      childName: "",
      childSurname: "",
      birth: "",
      pesel: "",
      startHour: "",
      finishHour: "",
      street: "",
      city: "",
      parentOne: "",
      parentOnePhone: "",
      parentTwo: "",
      parentTwoPhone: "",
      personOne: "",
      personOneRelationship: "",
      personTwo: "",
      personTwoRelationship: "",
    },

    validationSchema: childSchema,

    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleGenderChange = () => {
    setChosenGender((prev) => (prev === "M" ? "F" : "M"));
  };

  return (
    <form
      className={styles.childModalWrapper}
      onSubmit={formik.handleSubmit}
      id="child-form"
    >
      <div className={styles.childModalTop}>
        <div className={styles.childNameSurname}>
          <Input
            id="childName"
            name="childName"
            type="text"
            placeholder="imię"
            error={formik.errors.childName}
            touched={formik.touched.childName}
            {...formik.getFieldProps("childName")}
          />
          <Input
            id="childSurname"
            name="childSurname"
            type="text"
            placeholder="nazwisko"
            error={formik.errors.childSurname}
            touched={formik.touched.childSurname}
            {...formik.getFieldProps("childSurname")}
          />
        </div>
        <div className={styles.childGender}>
          <SvgIcon
            icon="male"
            onClick={handleGenderChange}
            data-gender={childGender === "M"}
          />
          <SvgIcon
            icon="female"
            onClick={handleGenderChange}
            data-gender={childGender === "F"}
          />
        </div>

        <div className={styles.childModalClose}>
          <Cross onClick={handleModal} />
        </div>
      </div>
      <div className={styles.childModalBottom}>
        <ChildFormLeftPart formik={formik} meals={meals} setMeals={setMeals} />
        <ChildFormCenterPart formik={formik} />
        <ChildFormRightPart />
      </div>
      <div className={styles.childModalSave}>
        <Button form="child-form" type="submit">
          dodaj
        </Button>
      </div>
    </form>
  );
};

export default ChildModal;
