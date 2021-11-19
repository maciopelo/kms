import React, { useEffect, useState } from "react";
import GenericPage from "../GenericPage/GenericPage";
import { useAuthContext } from "../../store/contexts/AuthContext";

const Employees = () => {
  const {
    authState: { user },
  } = useAuthContext();

  return (
    <GenericPage>
      <span>{JSON.stringify(user)}</span>
    </GenericPage>
  );
};

export default Employees;
