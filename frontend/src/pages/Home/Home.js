import React, { useEffect, useState } from "react";
import GenericPage from "../GenericPage/GenericPage";
import { useAuthContext } from "../../store/contexts/AuthContext";
import DailyInfoPanel from "../../components/molecules/DailyInfoPanel/DailyInfoPanel";
import { getCurrentDayObject } from "../../utils/helpers";
import TodoList from "../../components/organisms/TodoList/TodoList";
import styles from "./Home.module.scss";

const Home = () => {
  const {
    authState: { user },
  } = useAuthContext();

  const [currentDay, setCurrentDay] = useState(() =>
    getCurrentDayObject(new Date())
  );

  console.log(currentDay);
  return (
    <GenericPage>
      <div className={styles.homeContentWrapper}>
        <div className={styles.leftSide}>
          <DailyInfoPanel />
          <TodoList />
        </div>

        {/* <span>{JSON.stringify(user)}</span> */}
      </div>
    </GenericPage>
  );
};

export default Home;
