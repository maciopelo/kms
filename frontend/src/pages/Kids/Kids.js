import React, { useEffect, useState } from "react";
import GenericPage from "../GenericPage/GenericPage";
import useFetch from "../../hooks/useFetch";
import { API } from "../../api/urls";
import FilterPanel from "../../components/organisms/FilterPanel/FilterPanel";
import ChildrenList from "../../components/organisms/ChildrenList/ChildrenList";
import styles from "./Kids.module.scss";
import PlusButton from "../../components/atoms/PlusButton/PlusButton";
import { useModalContext } from "../../store/contexts/ModalContext";

const Kids = () => {
  const { handleModal } = useModalContext();
  const { data, setData, isLoading, callAPI } = useFetch();
  const [children, setChildren] = useState(data);

  useEffect(() => {
    callAPI(API.CHILDREN);
  }, []);

  useEffect(() => {
    setChildren(data);
  }, [data]);

  return (
    <GenericPage>
      <div className={styles.kidsPageContainer}>
        <FilterPanel data={data} setChildren={setChildren} />
        {data && !isLoading && (
          <ChildrenList children={children} setChildren={setChildren} />
        )}
        <PlusButton onClick={() => handleModal(<div />)} />
      </div>
    </GenericPage>
  );
};

export default Kids;
