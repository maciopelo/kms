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
import useFetch from "../../../../hooks/useFetch";
import { groupModalValidation } from "../../../../validators";

export const GroupModal = ({ update }) => {
  const { callAPI } = useFetch();
  const [childKeyword, setChildKeyword] = useState("");
  const { handleModal } = useModalContext();
  const [groupName, setGroupName] = useState("");
  const [groupType, setGroupType] = useState(null);
  const [teachers, setTeachers] = useState({ list: [], chosen: null });
  const [children, setChildren] = useState({
    list: [],
    filtered: [],
    chosen: [],
  });
  const [error, setError] = useState({
    name: "",
    children: "",
    type: "",
    teacher: "",
  });

  const fetchChildrenAndTeachers = async () => {
    const responses = await Promise.all([
      fetch(`${API.CHILDREN}?in_group=false`, { credentials: "include" }),
      fetch(`${API.TEACHER}?has_group=false`, { credentials: "include" }),
    ]);
    const jsons = responses.map((response) => {
      return response.json();
    });
    const data = await Promise.all(jsons);

    setChildren((prev) => ({ ...prev, list: data[0], filtered: data[0] }));
    setTeachers((prev) => ({ ...prev, list: data[1] }));
  };

  const handleChildrenOnchange = ({ target: { value } }) => {
    if (children.chosen.includes(parseInt(value))) {
      setChildren((prev) => ({
        ...prev,
        chosen: prev.chosen.filter((c) => c !== parseInt(value)),
      }));
      return;
    }
    setChildren((prev) => ({
      ...prev,
      chosen: [...prev.chosen, parseInt(value)],
    }));
  };

  const handleTeacherOnchange = ({ target: { value } }) => {
    setTeachers((prev) => ({ ...prev, chosen: parseInt(value) }));
  };

  const handleGroupNameChange = ({ target: { value } }) => {
    setGroupName(value);
  };

  const handleFilterInputChange = ({ target: { value } }) => {
    setChildKeyword(value);
  };

  const handleNewGroupAddition = async () => {
    const { errors, isValid } = groupModalValidation(
      groupName,
      groupType,
      children,
      teachers
    );
    console.log(errors);
    setError(errors);

    if (isValid) {
      const payload = {
        teacher: teachers.chosen,
        name: groupName,
        type: groupType,
        children: children.chosen,
      };
      await callAPI(API.GROUP, "POST", JSON.stringify(payload));
      handleModal();
      update(API.GROUP);
    }
  };

  useEffect(() => {
    fetchChildrenAndTeachers();
  }, []);

  useEffect(() => {
    setChildren((prev) => ({
      ...prev,
      filtered: prev.list.filter((child) => {
        if (childKeyword.trim().length === 0) return true;
        if (
          child.name
            .toLowerCase()
            .includes(childKeyword.trim().toLocaleLowerCase()) ||
          child.surname
            .toLowerCase()
            .includes(childKeyword.trim().toLocaleLowerCase())
        )
          return true;
        return false;
      }),
    }));
  }, [childKeyword]);

  console.log(children.chosen);
  return (
    <div className={styles.groupModalWrapper}>
      <div className={styles.groupModalHeader}>
        <Input
          kind="header"
          placeholder="Nazwa własna..."
          maxLength="40"
          value={groupName}
          onChange={handleGroupNameChange}
          touched={true}
          error={error.name}
        />

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

            <div className={styles.search}>
              <input
                type="text"
                placeholder="szukaj ..."
                value={childKeyword}
                onChange={handleFilterInputChange}
              />
              <Cross onClick={() => setChildKeyword("")} />
            </div>

            <div className={styles.list}>
              {children.list.length > 0 &&
                children.filtered.map((child) => (
                  <RadioOrCheckbox
                    key={child.id}
                    value={child.id}
                    type="checkbox"
                    text={`${child.name} ${child.surname}`}
                    checked={children.chosen.includes(child.id)}
                    onChange={handleChildrenOnchange}
                  />
                ))}
              <Text s10 error>
                {error.children}
              </Text>
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
            <Text s10 error>
              {error.type}
            </Text>
          </div>

          <div className={styles.groupField}>
            <Text rouge gray s28 fMedium>
              Wychowaca
            </Text>

            <div>
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
              <Text s10 error>
                {error.teacher}
              </Text>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.save}>
        <Button onClick={handleNewGroupAddition}>zapisz</Button>
      </div>
    </div>
  );
};
