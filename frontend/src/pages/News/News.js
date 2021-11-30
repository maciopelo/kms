import React, { useEffect, useState } from "react";
import GenericPage from "../GenericPage/GenericPage";
import { useAuthContext } from "../../store/contexts/AuthContext";
import styles from "./News.module.scss";
import PlusButton from "../../components/atoms/PlusButton/PlusButton";
import { useModalContext } from "../../store/contexts/ModalContext";
import NewsModal from "../../components/organisms/modals/NewsModal/NewsModal";

const News = () => {
  const { handleModal } = useModalContext();
  const {
    authState: { user },
  } = useAuthContext();

  return (
    <GenericPage>
      <PlusButton onClick={() => handleModal(<NewsModal />)} />
    </GenericPage>
  );
};

export default News;
