import React, { createContext, useState, useContext } from "react";
import Modal from "../../utils/Modal";

const ModalContext = createContext();

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }

  return context;
};

export const ModalProvider = ({ children }) => {
  const [isModal, setIsModal] = useState(false);
  const [component, setComponent] = useState(null);

  const handleModal = (content = false) => {
    setIsModal(!isModal);
    if (content) {
      setComponent(content);
    }
  };

  return (
    <ModalContext.Provider value={{ isModal, handleModal, component }}>
      <Modal />
      {children}
    </ModalContext.Provider>
  );
};
