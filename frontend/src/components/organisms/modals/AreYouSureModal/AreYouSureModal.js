import React from "react";
import styles from "./AreYouSureModal.module.scss";
import Cross from "../../../atoms/Cross/Cross";
import { useModalContext } from "../../../../store/contexts/ModalContext";
import Text from "../../../atoms/Text/Text";
import Button from "../../../atoms/Button/Button";

const AreYouSureModal = ({ question, onYes }) => {
  const { handleModal } = useModalContext();

  const handleOnYes = () => {
    onYes();
    handleModal();
  };
  return (
    <div className={styles.areYouSureModalWrapper}>
      <div className={styles.areYouSureModalHeader}>
        <Text s28 gray fMedium>
          {question}
        </Text>
        <div className={styles.areYouSureModalClose}>
          <Cross onClick={handleModal} />
        </div>
      </div>

      <div className={styles.areYouSureModalButtons}>
        <Button onClick={handleOnYes}>Tak</Button>
        <Button onClick={handleModal}>Nie</Button>
      </div>
    </div>
  );
};

export default AreYouSureModal;
