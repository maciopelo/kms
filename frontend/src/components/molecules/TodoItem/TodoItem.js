import React from "react";
import styles from "./TodoItem.module.scss";
import binIcon from "../../../assets/icons/bin.svg";
import { API } from "../../../api/urls";
import useFetch from "../../../hooks/useFetch";
import { parseText } from "../../../utils/helpers";

const TodoItem = ({
  todo: { id, text },
  setHomepageTodos = undefined,
  setCurrDayTodos,
  url,
}) => {
  const { callAPI } = useFetch();

  const deleteTodo = async (id) => {
    const data = await callAPI(`${url}${id}`, "DELETE");
    return data;
  };

  const handleTodoRemove = async () => {
    const data = await deleteTodo(id);
    console.log(data);
    if (Boolean(setHomepageTodos))
      setHomepageTodos((prevData) => [
        ...prevData.filter((todo) => todo.id !== data.id),
      ]);
    setCurrDayTodos((prevData) => [
      ...prevData.filter((todo) => todo.id !== data.id),
    ]);
  };

  console.log(parseText(text));
  console.log("asdsa");
  return (
    <li className={styles.todo}>
      <p className={styles.text}> {parseText(text)} </p>
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
