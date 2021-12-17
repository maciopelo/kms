import React, { useState, useEffect, useMemo } from "react";
import styles from "./EditableList.module.scss";
import useFetch from "../../../hooks/useFetch";
import TodoItem from "../../molecules/TodoItem/TodoItem";
import { v4 as uuidv4 } from "uuid";
import Text from "../../atoms/Text/Text";
import add from "../../../assets/icons/add.svg";
import { getDBDateFormat, getUrlDateFormat } from "../../../utils/dateHelpers";

const EditableList = ({ date, url, setHomepageTodos, group }) => {
  const [newTodo, setNewTodo] = useState("");
  const { data, isLoading, callAPI, setData } = useFetch();

  const postNewTodo = async () => {
    const payload = group
      ? JSON.stringify({
          group: group,
          text: newTodo,
          date: getDBDateFormat(date),
          is_for_all: group === -1,
        })
      : JSON.stringify({ text: newTodo, date: getDBDateFormat(date) });

    const data = await callAPI(url, "POST", payload);
    return data;
  };

  const handleNewTodoAdd = async () => {
    if (newTodo) {
      const data = await postNewTodo();
      setData((prevData) => [...prevData, data]);
      if (Boolean(setHomepageTodos))
        setHomepageTodos((prevData) => [...prevData, data]);
      setNewTodo("");
    }
  };

  const getCurrentDayTodos = async () => {
    await callAPI(`${url}${getUrlDateFormat(date)}`);

    if (group)
      setData((prev) =>
        prev.filter((announ) => {
          if (group === -1) return announ.is_for_all;
          return announ.group === group;
        })
      );
  };

  useEffect(() => {
    getCurrentDayTodos();
  }, []);

  useEffect(() => {
    getCurrentDayTodos();
  }, [group]);

  return (
    <>
      <div className={styles.todos}>
        {data && !isLoading ? (
          data.map((todo) => (
            <TodoItem
              key={uuidv4()}
              todo={todo}
              setHomepageTodos={setHomepageTodos}
              setCurrDayTodos={setData}
              url={url}
            />
          ))
        ) : (
          <Text s28 rouge fMedium>
            {isLoading ? "Loading..." : "Something went wrong"}
          </Text>
        )}
      </div>
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
    </>
  );
};

export default EditableList;
