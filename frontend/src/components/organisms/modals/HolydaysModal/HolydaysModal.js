import React from "react";
import { useModalContext } from "../../../../store/contexts/ModalContext";
import Cross from "../../../atoms/Cross/Cross";
import styles from "./HolydaysModal.module.scss";
import Text from "../../../atoms/Text/Text";

const HolydaysModal = ({ holydays }) => {
  const { handleModal } = useModalContext();
  return (
    <div className={styles.holydaysModalWrapper}>
      <div className={styles.holydaysModalHeader}>
        <div className={styles.close}>
          <Cross onClick={handleModal} />
        </div>
      </div>
      <div className={styles.holydaysModalContent}>
        <Text s24 rouge fMedium>
          Opcjonalne nietypowe święta
        </Text>
        <ul>
          {holydays.map((holyday) => (
            <li className={styles.singleHolyday}>
              <Text s16 gray fRegular>
                {holyday.name}
              </Text>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HolydaysModal;
