import React from "react";
import styles from "./TodoItem.module.scss";
import binIcon from "../../../assets/icons/bin.svg";
import { API } from "../../../api/urls";
import useFetch from "../../../hooks/useFetch";
import { parseText } from "../../../utils/helpers";
import Text from "../../atoms/Text/Text";

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

    if (Boolean(setHomepageTodos))
      setHomepageTodos((prevData) => [
        ...prevData.filter((todo) => todo.id !== data.id),
      ]);
    setCurrDayTodos((prevData) => [
      ...prevData.filter((todo) => todo.id !== data.id),
    ]);
  };

  return (
    <li className={styles.todo}>
      <p className={styles.text}>
        <Text s14 gray>
          {parseText(text)}
        </Text>
      </p>
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
