import React, { useState } from "react";
import styles from "./TodoList.module.scss";
import Text from "../../atoms/Text/Text";
import addIcon from "../../../assets/icons/add.svg";
import TodoItem from "../../molecules/TodoItem/TodoItem";
import { v4 as uuidv4 } from "uuid";

const TODOS = [
  {
    id: 0,
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Maecenas semper odio ac ex vestibulum, vitae rutrum ligula suscipit. 
          Mauris quis libero efficitur, varius nisi ac, euismod nibh.`,
  },
  {
    id: 1,
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Maecenas semper odio ac ex vestibulum, vitae rutrum ligula suscipit. 
          Mauris quis libero efficitur, varius nisi ac, euismod nibh.`,
  },
  {
    id: 2,
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Maecenas semper odio ac ex vestibulum, vitae rutrum ligula suscipit. 
          Mauris quis libero efficitur, varius nisi ac, euismod nibh.`,
  },
  {
    id: 3,
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Maecenas semper odio ac ex vestibulum, vitae rutrum ligula suscipit. 
    Mauris quis libero efficitur, varius nisi ac, euismod nib00000000000000000`,
  },
];

const TodoList = () => {
  const [todos, setTodos] = useState(TODOS);
  const [newTodoText, setNewTodoText] = useState("");

  const handleNewTodo = ({ target: { value } }) => {
    setNewTodoText(value);
  };

  const handleAddNewTodo = () => {
    setTodos((prevTodos) => [...prevTodos, { text: newTodoText }]);
  };

  return (
    <div className={styles.todoWrapper}>
      <header className={styles.header}>
        <Text s44 rouge fMedium>
          Lista zadań - 20.11.2021
        </Text>
      </header>

      <ul className={styles.todos}>
        {todos.map((todo) => (
          <TodoItem
            todo={todo}
            key={uuidv4()}
            setTodos={setTodos}
            todos={todos}
          />
        ))}
      </ul>

      <div className={styles.newTodo}>
        <textarea
          className={styles.newTodoTextarea}
          maxLength={200}
          placeholder="Wprowadź treść zadania. . ."
          value={newTodoText}
          onChange={handleNewTodo}
        />
        <img
          className={styles.newTodoButton}
          src={addIcon}
          alt="Add New Todo"
          onClick={handleAddNewTodo}
        />
      </div>
    </div>
  );
};

export default TodoList;
