import React from "react";
import styles from "./ModalInputHeader.module.scss";
import Cross from "../../atoms/Cross/Cross";
import { useModalContext } from "../../../store/contexts/ModalContext";
import Input from "../../molecules/Input/Input";

const ModalInputHeader = ({ ...rest }) => {
  const { handleModal } = useModalContext();
  const { formik } = rest;

  return (
    <div className={styles.topInputHeader}>
      <div className={styles.inputWrapper}>
        <Input
          kind="header"
          name="header"
          type="text"
          placeholder="nagłówek"
          error={formik.errors.header}
          touched={formik.touched.header}
          {...formik.getFieldProps("header")}
        />
      </div>

      <div className={styles.close}>
        <Cross onClick={handleModal} />
      </div>
    </div>
  );
};

export default ModalInputHeader;
