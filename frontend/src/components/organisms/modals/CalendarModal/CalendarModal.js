import React, { useState, useEffect } from "react";
import styles from "./CalendarModal.module.scss";
import ModalDateHeader from "../../../molecules/ModalDateHeader/ModalDateHeader";
import Text from "../../../atoms/Text/Text";
import Button from "../../../atoms/Button/Button";
import { API } from "../../../../api/urls";
import EditableList from "../../EditableList/EditableList";

const CalendarModal = ({ date, setHomepageTodos }) => {
  const [chosenGroup, setChosenGroup] = useState(0);
  const [groups, setGroups] = useState([]);

  const fetchGroups = async () => {
    const res = await fetch(API.GROUP, { credentials: "include" });
    const data = await res.json();

    setGroups(data);
    setChosenGroup(data[0].id);
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleGroupChange = ({ target: { value } }) => {
    setChosenGroup(parseInt(value));
  };

  return (
    <div className={styles.wrapper}>
      <ModalDateHeader date={date} />
      <div className={styles.content}>
        <div className={styles.contentLeft}>
          <div className={styles.todoList}>
            <header className={styles.todoListHeader}>
              <Text s28 rouge fMedium>
                Lista zadań
              </Text>
            </header>
            <EditableList
              date={date}
              url={API.USER.TODOS}
              setHomepageTodos={setHomepageTodos}
            />
          </div>

          {/* TODO: prepare functionality when uploading files in backedn ready*/}
          <div className={styles.menu}>
            <Text s28 rouge fMedium>
              Jadłospis
            </Text>
            <div className={styles.sendFile}>
              <Button>prześlij</Button>
              <Text s16 gray fLight>
                jadlospis.pdf
              </Text>
            </div>
          </div>
        </div>

        <div className={styles.contentRight}>
          <div className={styles.todoList}>
            <header className={styles.todoListHeader}>
              <Text s28 rouge fMedium>
                Ogłoszenia dla grup
              </Text>
              <div className={styles.dropdown}>
                <select value={chosenGroup} onChange={handleGroupChange}>
                  {groups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))}
                  <option value="-1">Wszystkie</option>
                </select>
              </div>
            </header>
            <EditableList
              date={date}
              url={API.ANNOUNCEMENT}
              group={chosenGroup}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;
