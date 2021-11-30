import React, { useState, useEffect } from "react";
import Text from "../../atoms/Text/Text";
import styles from "./Calendar.module.scss";
import { useModalContext } from "../../../store/contexts/ModalContext";
import CalendarModal from "../modals/CalendarModal/CalendarModal";
import kids from "../../../assets/images/home_kids.png";
import { days, months } from "../../../utils/dateHelpers";
import ParentCalendarModal from "../modals/ParentCalendarModal/ParentCalendarModal";
import { useAuthContext } from "../../../store/contexts/AuthContext";
import { USER } from "../../../utils/enums";

const date = new Date();

const Calendar = ({ data, setData }) => {
  const { handleModal } = useModalContext();
  const {
    authState: { user },
  } = useAuthContext();

  const generateCalendarTiles = () => {
    const currMonth = date.getMonth();
    const currYear = date.getFullYear();
    const currMonthDays = months[date.getMonth()].days;

    let results = [];
    for (let i = 1; i <= 32; i++) {
      let el;
      if (i <= currMonthDays) {
        const singleDay = new Date(currYear, currMonth, i);
        el = (
          <div
            key={i}
            className={`${styles.day} ${
              date.getDate() === i ? styles.today : ""
            }`}
            onClick={() =>
              handleModal(
                user.type === USER.PARENT ? (
                  <ParentCalendarModal date={singleDay} children={data} />
                ) : (
                  <CalendarModal
                    date={singleDay}
                    homepageTodos={data}
                    setHomepageTodos={setData}
                  />
                )
              )
            }
          >
            <Text gray s24 fMedium>
              {i}
            </Text>
            <Text gray s12 fMedium>
              {days[singleDay.getDay()]}
            </Text>
          </div>
        );
      } else {
        el = <div key={i} className={styles.day} />;
      }

      results.push(el);
    }

    return results;
  };

  return (
    <>
      <div className={styles.kids}>
        <img src={kids} alt="Jumping kids" />
      </div>
      <div className={styles.calendar}>
        <div className={styles.month}>
          <Text s44 fMedium gray>
            {months[date.getMonth()].name}
          </Text>
        </div>
        {generateCalendarTiles()}
      </div>
    </>
  );
};

export default Calendar;
