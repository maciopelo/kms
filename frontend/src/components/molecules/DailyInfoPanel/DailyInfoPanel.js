import React, { useState, useEffect, useMemo } from "react";
import styles from "./DailyInfoPanel.module.scss";
import Text from "../../atoms/Text/Text";
import clock from "../../../assets/icons/clock.png";
import { getDateAndTimeString } from "../../../utils/dateHelpers";

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
      <div className={styles.top}>
        <img className={styles.clock} src={clock} alt="Clock" />

        <Text s24 gray>
          {date}
        </Text>
      </div>

      <div className={styles.dayInfo}>
        <Text s24 rouge fMedium>
          Wybrane Święto Nietypowe :)
        </Text>
      </div>

      <div className={styles.nameDay}>
        <Text s24 gray fMedium>
          Imieniny:
          <Text fRegular> Tomasz, Aleksandra, Dominika</Text>
        </Text>
      </div>
    </div>
  );
};

export default DailyInfoPanel;
