import React from "react";
import styles from "./TodoItem.module.scss";
import binIcon from "../../../assets/icons/bin.svg";

const TodoItem = ({ todo: { id, text, isDone }, setTodos, todos }) => {
  const handleTodoRemove = (id) => {
    const result = todos.filter((todo) => todo.id !== id);
    console.log(result);
    setTodos(result);
  };
  return (
    <li className={styles.todo}>
      <p className={`${styles.text} ${isDone ? styles.done : ""}`}> {text} </p>
      <img
        className={styles.removeTodo}
        src={binIcon}
        alt="Remove Todo"
        onClick={() => handleTodoRemove(id)}
      />
    </li>
  );
};

export default TodoItem;
