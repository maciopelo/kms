import React from "react";
import styles from "./ChildModal.module.scss";
import Text from "../../../atoms/Text/Text";
import Input from "../../../molecules/Input/Input";
import RadioOrCheckbox from "../../../molecules/RadioOrCheckbox/RadioOrCheckbox";

const ChildFormLeftPart = ({ formik, meals, setMeals }) => {
  return (
    <div className={styles.childModalInputs}>
      <div className={styles.childModalFormSegment}>
        <Text s28 rouge fMedium>
          Data urodzenia
        </Text>
        <Input
          id="birth"
          name="birth"
          type="text"
          placeholder="dd-mm-rrrr"
          error={formik.errors.birth}
          touched={formik.touched.birth}
          {...formik.getFieldProps("birth")}
        />
      </div>

      <div className={styles.childModalFormSegment}>
        <Text s28 rouge fMedium>
          PESEL
        </Text>
        <Input
          id="pesel"
          name="pesel"
          type="text"
          placeholder="pesel"
          error={formik.errors.pesel}
          touched={formik.touched.pesel}
          {...formik.getFieldProps("pesel")}
        />
      </div>

      <div className={styles.childModalFormSegment}>
        <Text s28 rouge fMedium>
          Opcje żywieniowe
        </Text>
        <RadioOrCheckbox
          type="checkbox"
          text="śniadanie"
          id="breakfast"
          checked={meals.breakfast}
          onChange={() =>
            setMeals((prev) => ({
              ...prev,
              breakfast: !prev.breakfast,
            }))
          }
        />
        <RadioOrCheckbox
          type="checkbox"
          text="obiad"
          id="dinner"
          checked={meals.dinner}
          onChange={() =>
            setMeals((prev) => ({ ...prev, dinner: !prev.dinner }))
          }
        />
        <RadioOrCheckbox
          type="checkbox"
          text="podwieczorek"
          id="supper"
          checked={meals.supper}
          onChange={() =>
            setMeals((prev) => ({ ...prev, supper: !prev.supper }))
          }
        />
      </div>

      <div className={styles.childModalFormSegment}>
        <Text s28 rouge fMedium>
          Godziny
        </Text>
        <div>
          <Input
            id="startHour"
            name="startHour"
            type="text"
            placeholder="od godziny"
            error={formik.errors.startHour}
            touched={formik.touched.startHour}
            {...formik.getFieldProps("startHour")}
          />
        </div>
        <div className={styles.childModalFormSegment}>
          <Input
            id="finishHour"
            name="finishHour"
            type="text"
            placeholder="do godziny"
            error={formik.errors.finishHour}
            touched={formik.touched.finishHour}
            {...formik.getFieldProps("finishHour")}
          />
        </div>

        <div className={styles.childModalFormSegment}>
          <Text s28 rouge fMedium>
            Adres
          </Text>
          <Input
            id="street"
            name="street"
            type="text"
            placeholder="ulica, numer"
            error={formik.errors.street}
            touched={formik.touched.street}
            {...formik.getFieldProps("street")}
          />
          <Input
            id="city"
            name="city"
            type="text"
            placeholder="miejscowość"
            error={formik.errors.city}
            touched={formik.touched.city}
            {...formik.getFieldProps("city")}
          />
        </div>
      </div>
    </div>
  );
};

export default ChildFormLeftPart;
