import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { useModalContext } from "../store/contexts/ModalContext";

const Modal = () => {
  const { component, isModal } = useModalContext();
  if (isModal) {
    return ReactDOM.createPortal(
      <div className="modal-bg">{component}</div>,
      document.querySelector("#modal-root")
    );
  } else return null;
};

export default Modal;
