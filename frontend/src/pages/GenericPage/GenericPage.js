import React from "react";
import Header from "../../components/organisms/Header/Header";

const GenericPage = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default GenericPage;
