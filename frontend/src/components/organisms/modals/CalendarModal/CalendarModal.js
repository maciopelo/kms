import React, { useState, useEffect } from "react";
import styles from "./CalendarModal.module.scss";
import ModalHeader from "../../../molecules/ModalHeader/ModalHeader";
import Text from "../../../atoms/Text/Text";
import { v4 as uuidv4 } from "uuid";
import TodoItem from "../../../molecules/TodoItem/TodoItem";
import add from "../../../../assets/icons/add.svg";
import Button from "../../../atoms/Button/Button";
import { getDBDateFormat } from "../../../../utils/dateHelpers";
import { API } from "../../../../api/urls";

const CalendarModal = ({ date, todos, setTodos, isLoading }) => {
  const [chosenDayTodos, setChosenDayTodos] = useState(
    todos.filter((todo) => todo.date === getDBDateFormat(date))
  );
  const [newTodo, setNewTodo] = useState("");

  const postRequest = async () => {
    try {
      const res = await fetch(API.USER.TODOS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newTodo, date: getDBDateFormat(date) }),
        credentials: "include",
      });

      if (!res.ok) {
        const message = `An error has occured: ${res.status} - ${res.statusText}`;
        throw new Error(message);
      }

      const data = await res.json();

      if (getDBDateFormat(new Date()) === getDBDateFormat(date)) {
        setTodos((prevData) => [...prevData, data]);
      }

      setChosenDayTodos((prevData) => [...prevData, data]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleNewTodoAdd = () => {
    if (newTodo) {
      postRequest();
      setNewTodo("");
    }
  };

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

            {todos && !isLoading ? (
              <ul className={styles.todos}>
                {chosenDayTodos.map((todo) => (
                  <TodoItem
                    key={uuidv4()}
                    todo={todo}
                    todos={todos}
                    setTodos={setTodos}
                    setChosenDayTodos={setChosenDayTodos}
                  />
                ))}
              </ul>
            ) : (
              <Text s28 rouge fMedium>
                Loading...
              </Text>
            )}

            <div className={styles.addTodo}>
              <textarea
                placeholder="Nowe zadanie..."
                maxLength={200}
                onChange={(e) => setNewTodo(e.target.value)}
                value={newTodo}
              />
              <img src={add} alt="Plus Icon" onClick={handleNewTodoAdd} />
            </div>
          </div>

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
          <div>
            <Text s28 rouge fMedium>
              Informacje
            </Text>
            <select>
              <option>Grupa1</option>
            </select>
          </div>
          <textarea
            placeholder="Co dzieci mają zrobić 15.10 ..."
            maxLength={500}
          />
        </div>
      </div>
      <div className={styles.save}>
        <Button>zapisz</Button>
      </div>
    </div>
  );
};

export default CalendarModal;
