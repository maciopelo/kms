import React, { useEffect } from "react";
import GenericPage from "../GenericPage/GenericPage";
import { useAuthContext } from "../../store/contexts/AuthContext";
import DailyInfoPanel from "../../components/molecules/DailyInfoPanel/DailyInfoPanel";
import TodoList from "../../components/organisms/TodoList/TodoList";
import styles from "./Home.module.scss";
import Calendar from "../../components/organisms/Calendar/Calendar";
import useFetch from "../../hooks/useFetch";
import { API } from "../../api/urls";
import { USER } from "../../utils/enums";
import ChildrenTile from "../../components/organisms/ChildrenTile/ChildrenTile";

const Home = () => {
  const {
    authState: { user },
  } = useAuthContext();

  const { data, error, isLoading, callAPI, setData } = useFetch();

  useEffect(() => {
    if (user.type === USER.PARENT) {
      callAPI(API.USER.CHILDREN);
    } else callAPI(API.USER.TODOS);
  }, []);

  return (
    <GenericPage>
      <div className={styles.homeContainer}>
        <div className={styles.leftSide}>
          <DailyInfoPanel />
          {user.type === USER.PARENT && data && !isLoading ? (
            <ChildrenTile children={data} />
          ) : (
            <TodoList todos={data} error={error} />
          )}
        </div>
        <div className={styles.rightSide}>
          <Calendar data={data} setData={setData} />
        </div>
      </div>
    </GenericPage>
  );
};

export default Home;
