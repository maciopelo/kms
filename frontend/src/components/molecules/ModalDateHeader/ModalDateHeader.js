import Text from "../../atoms/Text/Text";
import { useModalContext } from "../../../store/contexts/ModalContext";
import styles from "./ModalDateHeader.module.scss";
import Cross from "../../atoms/Cross/Cross";
import { days, months } from "../../../utils/dateHelpers";

const ModalDateHeader = ({ date }) => {
  const { handleModal } = useModalContext();

  return (
    <div className={styles.topDateHeader}>
      <Text s44 gray fMedium>
        {months[date.getMonth()].name}
      </Text>
      <div className={styles.dayTile}>
        <Text gray fMedium s24>
          {days[date.getDay()]}
        </Text>
        <Text gray fMedium s44>
          {date.getDate()}
        </Text>
      </div>
      <div className={styles.close}>
        <Cross onClick={handleModal} />
      </div>
    </div>
  );
};

export default ModalDateHeader;
