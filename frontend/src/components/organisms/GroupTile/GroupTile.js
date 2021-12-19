import React from "react";
import Text from "../../atoms/Text/Text";
import styles from "./GroupTile.module.scss";
import { GROUPS } from "../../../utils/enums";
import edit from "../../../assets/icons/edit.svg";
import bin from "../../../assets/icons/bin.svg";
import AreYouSureModal from "../modals/AreYouSureModal/AreYouSureModal";
import { useModalContext } from "../../../store/contexts/ModalContext";
import useFetch from "../../../hooks/useFetch";
import { API } from "../../../api/urls";
import { GroupModal } from "../modals/GroupModal/GroupModal";

const GroupTile = ({ id, name, childrenCount, teacher, type, update }) => {
  const { handleModal } = useModalContext();
  const { callAPI } = useFetch();

  const handleGroupRemove = async () => {
    await callAPI(`${API.GROUP}${id}`, "DELETE");
    update(`${API.GROUP}`);
  };

  return (
    <div className={styles.groupTileWrapper} data-color={type}>
      <div className={styles.groupType}>
        <Text fBold rouge s44>
          {GROUPS[type].name}
        </Text>
      </div>

      <div className={styles.groupInfo}>
        <Text fRegular gray s24>
          dzieci
        </Text>

        <Text fBold gray s24>
          {childrenCount}
        </Text>
      </div>

      <div className={styles.groupInfo}>
        <Text fRegular gray s24>
          nazwa
        </Text>

        <Text fBold gray s24>
          {name}
        </Text>
      </div>

      <div className={styles.groupInfo}>
        <Text fRegular gray s24>
          wychowawca
        </Text>

        <Text fBold gray s24>
          {teacher.name}
        </Text>
      </div>

      <img
        className={styles.editGroup}
        src={edit}
        alt="Edit Icon"
        onClick={() =>
          handleModal(
            <GroupModal
              update={update}
              id={id}
              name={name}
              type={type}
              teacher={teacher}
            />
          )
        }
      />
      <img
        className={styles.removeGroup}
        src={bin}
        alt="Edit Icon"
        onClick={() =>
          handleModal(
            <AreYouSureModal
              question="Czy usunąć grupę z systemu? "
              onYes={handleGroupRemove}
            />
          )
        }
      />
    </div>
  );
};

export default GroupTile;
