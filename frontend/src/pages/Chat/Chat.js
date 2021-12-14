import React, { useEffect, useState } from "react";
import GenericPage from "../../templates/GenericPage/GenericPage";
import { useAuthContext } from "../../store/contexts/AuthContext";

const Chat = () => {
  const {
    authState: { user },
  } = useAuthContext();

  return (
    <GenericPage>
      <span>{JSON.stringify(user)}</span>
    </GenericPage>
  );
};

export default Chat;
