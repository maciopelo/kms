import React, { useEffect, useState } from "react";
import GenericPage from "../../templates/GenericPage/GenericPage";
import useFetch from "../../hooks/useFetch";
import { API } from "../../api/urls";
import FilterPanel from "../../components/organisms/FilterPanel/FilterPanel";
import ChildrenList from "../../components/organisms/ChildrenList/ChildrenList";
import styles from "./Children.module.scss";
import PlusButton from "../../components/atoms/PlusButton/PlusButton";
import { useModalContext } from "../../store/contexts/ModalContext";
import ChildModal from "../../components/organisms/modals/ChildModal/ChildModal";

const Children = () => {
  const { handleModal } = useModalContext();
  const { data, setData, isLoading, callAPI } = useFetch();
  const [children, setChildren] = useState([]);

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
          <ChildrenList
            data={data}
            children={children}
            setChildren={setChildren}
          />
        )}
        <PlusButton
          onClick={() => handleModal(<ChildModal update={callAPI} />)}
        />
      </div>
    </GenericPage>
  );
};

export default Children;
