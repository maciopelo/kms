import React from "react";
import styles from "./TodoItem.module.scss";
import binIcon from "../../../assets/icons/bin.svg";
import { API } from "../../../api/urls";
import useFetch from "../../../hooks/useFetch";

const TodoItem = ({
  todo: { id, text },
  setHomepageTodos,
  setCurrDayTodos,
}) => {
  const { callAPI } = useFetch();

  const deleteTodo = async (id) => {
    const data = await callAPI(`${API.USER.TODOS}${id}`, "DELETE");
    return data;
  };

  const handleTodoRemove = async () => {
    const data = await deleteTodo(id);
    console.log(data);
    setHomepageTodos((prevData) => [
      ...prevData.filter((todo) => todo.id !== data.id),
    ]);
    setCurrDayTodos((prevData) => [
      ...prevData.filter((todo) => todo.id !== data.id),
    ]);
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
