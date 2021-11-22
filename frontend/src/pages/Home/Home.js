import React, { useEffect, useState } from "react";
import GenericPage from "../GenericPage/GenericPage";
import { useAuthContext } from "../../store/contexts/AuthContext";
import DailyInfoPanel from "../../components/molecules/DailyInfoPanel/DailyInfoPanel";
import TodoList from "../../components/organisms/TodoList/TodoList";
import styles from "./Home.module.scss";
import Calendar from "../../components/organisms/Calendar/Calendar";
import useFetch from "../../hooks/useFetch";
import { API } from "../../api/urls";

const Home = () => {
  const {
    authState: { user },
  } = useAuthContext();

  const { data, error, isLoading, setData } = useFetch(API.USER.TODOS);

  return (
    <GenericPage>
      <div className={styles.homeContainer}>
        <div className={styles.leftSide}>
          <DailyInfoPanel />
          <TodoList todos={data} isLoading={isLoading} />
        </div>
        <div className={styles.rightSide}>
          <Calendar todos={data} setTodos={setData} isLoading={isLoading} />
        </div>
      </div>
    </GenericPage>
  );
};

export default Home;
