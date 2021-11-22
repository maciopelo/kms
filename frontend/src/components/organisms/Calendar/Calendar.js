import React, { useState, useEffect } from "react";
import Text from "../../atoms/Text/Text";
import styles from "./Calendar.module.scss";
import { useModalContext } from "../../../store/contexts/ModalContext";
import CalendarModal from "../modals/CalendarModal/CalendarModal";
import kids from "../../../assets/images/home_kids.png";
import { days, months } from "../../../utils/dateHelpers";

const date = new Date();

const Calendar = ({ todos, setTodos, isLoading }) => {
  const { handleModal } = useModalContext();

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
                <CalendarModal
                  date={singleDay}
                  todos={todos}
                  setTodos={setTodos}
                  isLoading={isLoading}
                />
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
