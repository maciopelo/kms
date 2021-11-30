import React, { useState, useEffect } from "react";
import styles from "./CalendarModal.module.scss";
import ModalHeader from "../../../molecules/ModalHeader/ModalHeader";
import Text from "../../../atoms/Text/Text";
import { v4 as uuidv4 } from "uuid";
import TodoItem from "../../../molecules/TodoItem/TodoItem";
import add from "../../../../assets/icons/add.svg";
import Button from "../../../atoms/Button/Button";
import {
  getDBDateFormat,
  getUrlDateFormat,
} from "../../../../utils/dateHelpers";
import { API } from "../../../../api/urls";
import useFetch from "../../../../hooks/useFetch";
import GroupsAnnouncements from "../../GroupsAnnouncements/GroupsAnnouncements";

const CalendarModal = ({ date, setHomepageTodos }) => {
  const [newTodo, setNewTodo] = useState("");
  const { data, isLoading, callAPI, setData } = useFetch();

  const postNewTodo = async () => {
    const data = await callAPI(
      API.USER.TODOS,
      "POST",
      JSON.stringify({ text: newTodo, date: getDBDateFormat(date) })
    );
    return data;
  };

  const getCurrentDayTodos = () => {
    callAPI(`${API.USER.TODOS}${getUrlDateFormat(date)}`);
  };

  const handleNewTodoAdd = async () => {
    if (newTodo) {
      const data = await postNewTodo();
      setData((prevData) => [...prevData, data]);
      setHomepageTodos((prevData) => [...prevData, data]);
      setNewTodo("");
    }
  };

  useEffect(() => {
    getCurrentDayTodos();
  }, []);

  return (
    <div className={styles.wrapper}>
      <ModalHeader date={date} />
      <div className={styles.content}>
        <div className={styles.contentLeft}>
          <div className={styles.todoList}>
            <header className={styles.todoListHeader}>
              <Text s28 rouge fMedium>
                Zadania
              </Text>
            </header>

            {data && !isLoading ? (
              <ul className={styles.todos}>
                {data.map((todo) => (
                  <TodoItem
                    key={uuidv4()}
                    todo={todo}
                    setHomepageTodos={setHomepageTodos}
                    setCurrDayTodos={setData}
                  />
                ))}
              </ul>
            ) : (
              <Text s28 rouge fMedium>
                {isLoading ? "Loading..." : "Something went wrong"}
              </Text>
            )}

            <div className={styles.addTodo}>
              <textarea
                className={styles.newTodoTextarea}
                placeholder="Nowe zadanie..."
                maxLength={200}
                onChange={(e) => setNewTodo(e.target.value)}
                value={newTodo}
              />
              <img src={add} alt="Plus Icon" onClick={handleNewTodoAdd} />
            </div>
          </div>

          {/* TODO: prepare functionality when uploading files in backedn ready*/}
          <div className={styles.menu}>
            <Text s28 rouge fMedium>
              Jadłospis (15.10 - 20.10)
            </Text>
            <div className={styles.sendFile}>
              <Button>prześlij</Button>
              <Text s16 gray fLight>
                jadlospis_1_pazdzernik.pdf
              </Text>
            </div>
          </div>
        </div>

        <div className={styles.contentRight}>
          <GroupsAnnouncements date={date} />
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;
