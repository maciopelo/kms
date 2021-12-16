import React, { useEffect, useState } from "react";
import { API } from "../../../../api/urls";
import useFetch from "../../../../hooks/useFetch";
import tik from "../../../../assets/icons/tik.svg";
import cross from "../../../../assets/icons/cross.svg";
import { getUrlDateFormat } from "../../../../utils/dateHelpers";
import Text from "../../../atoms/Text/Text";
import ModalDateHeader from "../../../molecules/ModalDateHeader/ModalDateHeader";
import styles from "./ParentCalendarModal.module.scss";

const ParentCalendarModal = ({ date, children }) => {
  const { data, isLoading, callAPI } = useFetch();

  const [currChild, setCurrChild] = useState(children[0]);

  useEffect(() => {
    callAPI(`${API.ANNOUNCEMENT}${getUrlDateFormat(date)}`);
  }, [currChild]);

  const handleChildrenChange = ({ target: { value } }) => {
    setCurrChild(children.filter((child) => child.id === parseInt(value))[0]);
  };

  return (
    <div className={styles.wrapper}>
      <ModalDateHeader date={date} />
      <div className={styles.content}>
        <div className={styles.header}>
          <Text s28 rouge fMedium>
            Ogłoszenia
          </Text>
          <select className={styles.dropdown} onChange={handleChildrenChange}>
            {children.map((child) => (
              <option
                key={child.id}
                value={child.id}
              >{`${child.name} ${child.surname}`}</option>
            ))}
          </select>
        </div>
        <div className={styles.announcements}>
          <ul>
            {!isLoading && Boolean(data)
              ? data
                  .filter((an) => an.is_for_all || an.group === currChild.group)
                  .map((an) => (
                    <li>
                      <Text s16 gray>
                        {an.text}
                      </Text>
                    </li>
                  ))
              : "Loading..."}
          </ul>
        </div>
        <div className={styles.attendance}>
          <Text s16 gray fMedium>
            Obecny
          </Text>
          <img src={tik} alt="Attendance Icon" />
        </div>
      </div>
    </div>
  );
};

export default ParentCalendarModal;
