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
import {
  getDBDateFormat,
  getDateFromDateString,
} from "../../../../utils/dateHelpers";
import useFetch from "../../../../hooks/useFetch";
import { API } from "../../../../api/urls";
import Text from "../../../atoms/Text/Text";

const ChildModal = ({ child = null, update }) => {
  const { handleModal } = useModalContext();
  const [error, setError] = useState(false);
  const { callAPI } = useFetch();

  const [childGender, setChosenGender] = useState("M");
  const [meals, setMeals] = useState({
    breakfast: Boolean(child) ? child.eats_breakfast : false,
    dinner: Boolean(child) ? child.eats_dinner : false,
    supper: Boolean(child) ? child.eats_supper : false,
  });

  const formik = useFormik({
    initialValues: {
      childName: Boolean(child) ? child.name : "",
      childSurname: Boolean(child) ? child.surname : "",
      birth: Boolean(child) ? getDateFromDateString(child.date_of_birth) : "",
      pesel: Boolean(child) ? child.pesel : "",
      startHour: Boolean(child) ? child.coming_hour.substring(0, 5) : "",
      finishHour: Boolean(child) ? child.leaving_hour.substring(0, 5) : "",
      street: Boolean(child) ? child.street : "",
      number: Boolean(child) ? child.house_number : "",
      city: Boolean(child) ? child.city : "",
      parentOne: Boolean(child) ? child.parent_one.split(",")[0] : "",
      parentOnePhone: Boolean(child) ? child.parent_one.split(",")[1] : "",
      parentTwo: Boolean(child) ? child.parent_two.split(",")[0] : "",
      parentTwoPhone: Boolean(child) ? child.parent_two.split(",")[1] : "",
      personOne: Boolean(child)
        ? child.authorized_person_one.split(",")[0]
        : "",
      personOneRelationship: Boolean(child)
        ? child.authorized_person_one.split(",")[1]
        : "",
      personTwo: Boolean(child)
        ? child.authorized_person_two.split(",")[0]
        : "",
      personTwoRelationship: Boolean(child)
        ? child.authorized_person_two.split(",")[1]
        : "",
      sicknesses: Boolean(child) ? child.sicknesses : "",
      additionalInfo: Boolean(child) ? child.additional_info : "",
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
      sicknesses,
      additionalInfo,
    }) => {
      const [day, month, year] = birth.split("-");
      const newChild = {
        name: childName,
        surname: childSurname,
        gender: childGender,
        date_of_birth: getDBDateFormat(new Date(year, month - 1, day)),
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
        authorized_person_one:
          personOne && personOneRelationship
            ? `${personOne}, ${personOneRelationship}`
            : "",
        authorized_person_two:
          personOne && personOneRelationship
            ? `${personTwo}, ${personTwoRelationship}`
            : "",
        sicknesses: sicknesses,
        additional_info: additionalInfo,
      };

      const res = await callAPI(
        Boolean(child) ? `${API.CHILDREN}${child.id}` : API.CHILDREN,
        Boolean(child) ? "PUT" : "POST",
        JSON.stringify(newChild)
      );

      if (res) {
        const err = res.pesel !== undefined;
        if (!err) {
          setError(false);
          formik.resetForm();
          handleModal();
          update(Boolean(child) ? `${API.CHILDREN}${child.id}` : API.CHILDREN);
          return;
        }
        setError(true);
        formik.resetForm();
        setTimeout(() => {
          setError(false);
        }, 5000);
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
        <ChildFormRightPart formik={formik} />
      </div>
      <div className={styles.childModalSave}>
        <div data-visible={error}>
          <Text s16 rouge fBold>
            Dziecko o takim peselu już istnieje w systemie!
          </Text>
        </div>

        <Button form="child-form" type="submit">
          zapisz
        </Button>
      </div>
    </form>
  );
};

export default ChildModal;
