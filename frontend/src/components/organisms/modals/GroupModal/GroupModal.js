import React, { useState, useEffect } from "react";
import { useModalContext } from "../../../../store/contexts/ModalContext";
import Button from "../../../atoms/Button/Button";
import Cross from "../../../atoms/Cross/Cross";
import Text from "../../../atoms/Text/Text";
import RadioOrCheckbox from "../../../molecules/RadioOrCheckbox/RadioOrCheckbox";
import styles from "./GroupModal.module.scss";
import { GROUPS } from "../../../../utils/enums";
import Input from "../../../molecules/Input/Input";
import { API } from "../../../../api/urls";

export const GroupModal = () => {
  const { handleModal } = useModalContext();
  const [groupType, setGroupType] = useState(null);
  const [teachers, setTeachers] = useState({ list: [], chosen: null });
  const [children, setChildren] = useState({ list: [], chosen: [] });

  const fetchChildrenAndTeachers = async () => {
    const responses = await Promise.all([
      fetch(`${API.CHILDREN}?in_group=false`, { credentials: "include" }),
      fetch(API.TEACHER, { credentials: "include" }),
    ]);
    const jsons = responses.map((response) => {
      return response.json();
    });
    const data = await Promise.all(jsons);

    setChildren((prev) => ({ ...prev, list: data[0] }));
    setTeachers((prev) => ({ ...prev, list: data[1] }));
  };

  useEffect(() => {
    fetchChildrenAndTeachers();
  }, []);

  const handleChildrenOnchange = ({ target: { value } }) => {
    if (children.chosen.includes(value)) {
      setChildren((prev) => ({
        ...prev,
        chosen: prev.chosen.filter((c) => c !== value),
      }));
      return;
    }
    setChildren((prev) => ({
      ...prev,
      chosen: [...prev.chosen, value],
    }));
  };

  const handleTeacherOnchange = ({ target: { value } }) => {
    setTeachers((prev) => ({ ...prev, chosen: parseInt(value) }));
  };

  console.log(children);
  console.log(teachers);

  return (
    <div className={styles.groupModalWrapper}>
      <div className={styles.groupModalHeader}>
        <Input kind="header" placeholder="Nazwa własna..." maxLength="40" />
        <div className={styles.close}>
          <Cross onClick={handleModal} />
        </div>
      </div>

      <div className={styles.groupModalContent}>
        <div className={styles.groupModalFields}>
          <div className={styles.groupField}>
            <Text rouge gray s28 fMedium>
              Dzieci
            </Text>

            <div className={styles.list}>
              {children.list.length > 0 &&
                children.list.map((child) => (
                  <RadioOrCheckbox
                    key={child.id}
                    value={child.id}
                    type="checkbox"
                    text={`${child.name} ${child.surname}`}
                    onChange={handleChildrenOnchange}
                  />
                ))}
            </div>
          </div>
        </div>

        <div className={styles.groupModalFields}>
          <div className={styles.groupField}>
            <Text rouge gray s28 fMedium>
              Rodzaj
            </Text>

            <RadioOrCheckbox
              type="radio"
              text={GROUPS.YOUNGERS.name}
              checked={groupType === GROUPS.YOUNGERS.type}
              onChange={() => setGroupType(GROUPS.YOUNGERS.type)}
            />
            <RadioOrCheckbox
              type="radio"
              text={GROUPS.MIDDLES.name}
              checked={groupType === GROUPS.MIDDLES.type}
              onChange={() => setGroupType(GROUPS.MIDDLES.type)}
            />
            <RadioOrCheckbox
              type="radio"
              text={GROUPS.OLDERS.name}
              checked={groupType === GROUPS.OLDERS.type}
              onChange={() => setGroupType(GROUPS.OLDERS.type)}
            />
          </div>

          <div className={styles.groupField}>
            <Text rouge gray s28 fMedium>
              Wychowaca
            </Text>

            <div className={styles.list}>
              {teachers.list.length > 0 &&
                teachers.list.map((teacher) => (
                  <RadioOrCheckbox
                    key={teacher.id}
                    value={teacher.id}
                    type="radio"
                    text={`${teacher.name} ${teacher.surname}`}
                    checked={teachers.chosen === teacher.id}
                    onChange={handleTeacherOnchange}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.save}>
        <Button>zapisz</Button>
      </div>
    </div>
  );
};
