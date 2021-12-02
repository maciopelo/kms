import React, { useEffect, useState } from "react";
import GenericPage from "../GenericPage/GenericPage";
import { useAuthContext } from "../../store/contexts/AuthContext";
import styles from "./News.module.scss";
import PlusButton from "../../components/atoms/PlusButton/PlusButton";
import { useModalContext } from "../../store/contexts/ModalContext";
import NewsModal from "../../components/organisms/modals/NewsModal/NewsModal";
import useFetch from "../../hooks/useFetch";
import { API } from "../../api/urls";
import NewsTile from "../../components/organisms/NewsTile/NewsTile";
import { v4 as uuidv4 } from "uuid";

const News = () => {
  const { handleModal } = useModalContext();
  const {
    authState: { user },
  } = useAuthContext();

  const { data, setData, isLoading, callAPI } = useFetch();

  useEffect(() => {
    callAPI(`${API.NEWS}`);
  }, []);

  console.log(data);

  return (
    <GenericPage>
      {data &&
        !isLoading &&
        data.map((news) => <NewsTile key={uuidv4()} news={news} />)}
      <PlusButton onClick={() => handleModal(<NewsModal />)} />
    </GenericPage>
  );
};

export default News;
