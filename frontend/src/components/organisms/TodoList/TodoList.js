import React, { useState } from "react";
import styles from "./TodoList.module.scss";
import Text from "../../atoms/Text/Text";
import { v4 as uuidv4 } from "uuid";
import {
  getDateFromDateObj,
  getDBDateFormat,
} from "../../../utils/dateHelpers";

const date = new Date();

const TodoList = ({ todos }) => {
  return (
    <div className={styles.todoWrapper}>
      <header className={styles.header}>
        <Text s40 rouge fMedium>
          {`zadania - ${getDateFromDateObj(date)}`}
        </Text>
      </header>

      {todos && (
        <ul className={styles.todos}>
          {todos
            .filter((todo) => todo.date === getDBDateFormat(date))
            .map((todo, idx) => (
              <li className={styles.todo} key={uuidv4()}>
                <Text s24 gray>
                  {`${idx + 1}.`}
                </Text>
                <p className={styles.text}>
                  <Text s16 gray>
                    {todo.text}
                  </Text>
                </p>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
