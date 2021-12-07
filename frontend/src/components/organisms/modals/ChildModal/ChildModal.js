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
import { getDBDateFormat } from "../../../../utils/dateHelpers";
import useFetch from "../../../../hooks/useFetch";
import { API } from "../../../../api/urls";

const ChildModal = ({ update }) => {
  const { handleModal } = useModalContext();
  const { callAPI } = useFetch();

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
      number: "",
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

    onSubmit: async ({
      childName,
      childSurname,
      birth,
      pesel,
      startHour,
      finishHour,
      street,
      number,
      city,
      parentOne,
      parentOnePhone,
      parentTwo,
      parentTwoPhone,
      personOne,
      personOneRelationship,
      personTwo,
      personTwoRelationship,
    }) => {
      const newChild = {
        name: childName,
        surname: childSurname,
        gender: childGender,
        date_of_birth: getDBDateFormat(new Date(birth)),
        pesel: pesel,
        eats_breakfast: meals.breakfast,
        eats_dinner: meals.dinner,
        eats_supper: meals.supper,
        street: street,
        house_number: number,
        city: city,
        coming_hour: startHour,
        leaving_hour: finishHour,
        parent_one: `${parentOne}, ${parentOnePhone}`,
        parent_two: `${parentTwo}, ${parentTwoPhone}`,
        authorized_person_one: `${personOne}, ${personOneRelationship}`,
        authorized_person_two: `${personTwo}, ${personTwoRelationship}`,
      };

      const res = await callAPI(API.CHILDREN, "POST", JSON.stringify(newChild));

      if (res) {
        formik.resetForm();
        handleModal();
        update(API.CHILDREN);
      }
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
