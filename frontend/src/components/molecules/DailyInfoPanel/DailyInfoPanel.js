import React, { useState, useEffect, useMemo } from "react";
import styles from "./DailyInfoPanel.module.scss";
import Text from "../../atoms/Text/Text";
import clock from "../../../assets/icons/clock.png";
import { getDateAndTimeString } from "../../../utils/dateHelpers";
import { ATYPICAL_HOLY_DAYS_URL } from "../../../api/urls";
import { useModalContext } from "../../../store/contexts/ModalContext";
import HolydaysModal from "../../organisms/modals/HolydaysModal/HolydaysModal";

const TODAY = new Date();

const DailyInfoPanel = () => {
  const [date, setDate] = useState(() => getDateAndTimeString(TODAY));
  const { handleModal } = useModalContext();
  const [atypicalHolydays, setAtypicalHolydays] = useState([]);
  const [chosenAtypicalHolyday, setChosenAtypicalHolyday] = useState("");

  useEffect(() => {
    const fetchAtypicalHoldyday = async () => {
      const res = await fetch(
        `${ATYPICAL_HOLY_DAYS_URL}${TODAY.getMonth() +
          1}/${TODAY.getDate()}.json`,
        { mode: "cors" }
      );
      const data = await res.json();
      setAtypicalHolydays(data);
      if (data.length > 0) setChosenAtypicalHolyday(data[0].name);
    };
    fetchAtypicalHoldyday();
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
          {chosenAtypicalHolyday}
        </Text>
      </div>
      {atypicalHolydays.length > 1 && (
        <div
          className={styles.moreHolydays}
          onClick={() =>
            handleModal(<HolydaysModal holydays={atypicalHolydays} />)
          }
        >
          <Text s12 gray>
            więcej świąt...
          </Text>
        </div>
      )}
    </div>
  );
};

export default DailyInfoPanel;
