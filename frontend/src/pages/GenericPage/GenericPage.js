import React from "react";
import Header from "../../components/organisms/Header/Header";
import styles from "./GenericPage.module.scss";

const GenericPage = ({ children }) => {
  return (
    <>
      <Header />
      <main className={styles.container}>{children}</main>
    </>
  );
};

export default GenericPage;
