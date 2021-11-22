import React from "react";
import styles from "./TodoItem.module.scss";
import binIcon from "../../../assets/icons/bin.svg";
import { API } from "../../../api/urls";

const TodoItem = ({ todo: { id, text }, setTodos, setChosenDayTodos }) => {
  const deleteRequest = async (id) => {
    try {
      const res = await fetch(API.USER.TODOS, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
        credentials: "include",
      });

      if (!res.ok) {
        const message = `An error has occured: ${res.status} - ${res.statusText}`;
        throw new Error(message);
      }

      setTodos((prevData) => [...prevData.filter((todo) => todo.id !== id)]);
      setChosenDayTodos((prevData) => [
        ...prevData.filter((todo) => todo.id !== id),
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleTodoRemove = () => {
    deleteRequest(id);
  };

  return (
    <li className={styles.todo}>
      <p className={styles.text}> {text} </p>
      <img
        className={styles.removeTodo}
        src={binIcon}
        alt="Remove Todo"
        onClick={handleTodoRemove}
      />
    </li>
  );
};

export default TodoItem;
