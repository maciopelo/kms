import React, { useState } from "react";
import styles from "./TodoList.module.scss";
import Text from "../../atoms/Text/Text";
import { v4 as uuidv4 } from "uuid";
import { getCalendarDate, getDBDateFormat } from "../../../utils/dateHelpers";

const date = new Date();

const TodoList = ({ todos, isLoading }) => {
  return (
    <div className={styles.todoWrapper}>
      <header className={styles.header}>
        <Text s40 rouge fMedium>
          {`zadania - ${getCalendarDate(date)}`}
        </Text>
      </header>
      {todos && !isLoading ? (
        <ul className={styles.todos}>
          {todos
            .filter((todo) => todo.date === getDBDateFormat(date))
            .map((todo, idx) => (
              <li className={styles.todo} key={uuidv4()}>
                <Text s24 gray>
                  {`${idx + 1}.`}
                </Text>
                <p className={styles.text}>{todo.text}</p>
              </li>
            ))}
        </ul>
      ) : (
        <Text s28 rouge fMedium>
          Loading...
        </Text>
      )}
    </div>
  );
};

export default TodoList;
