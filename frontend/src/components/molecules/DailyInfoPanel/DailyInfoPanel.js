import React, { useState, useEffect, useMemo } from "react";
import styles from "./DailyInfoPanel.module.scss";
import Text from "../../atoms/Text/Text";
import clock from "../../../assets/icons/clock.png";
import { getDateAndTimeString } from "../../../utils/helpers";

const DailyInfoPanel = () => {
  const [date, setDate] = useState(() => getDateAndTimeString(new Date()));

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(() => getDateAndTimeString(new Date()));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.wrapper}>
      <img className={styles.clock} src={clock} alt="Clock" />
      <div className={styles.datetime}>
        <Text s24 gray>
          {date}
        </Text>
      </div>
      <div className={styles.dayInfo}>
        <Text s34 rouge fMedium>
          Dzień Kubusia Puchatka
        </Text>
      </div>
      <div className={styles.nameDay}>
        <Text s24 gray fMedium>
          Imieniny:
          <Text fRegular> Tomasz, Aleksandra, Dominika, Marek</Text>
        </Text>
      </div>
    </div>
  );
};

export default DailyInfoPanel;
