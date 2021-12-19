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

export const GroupModal = ({
  update,
  id = null,
  name = null,
  type = null,
  teacher = null,
}) => {
  const { callAPI } = useFetch();
  const [childKeyword, setChildKeyword] = useState("");
  const { handleModal } = useModalContext();
  const [groupName, setGroupName] = useState("");
  const [groupType, setGroupType] = useState(null);
  const [teachers, setTeachers] = useState({ list: [], chosen: null });
  const [children, setChildren] = useState({
    list: [],
    filtered: [],
    filteredWithoutGroup: [],
    withoutGroup: [],
    chosen: [],
  });
  const [error, setError] = useState({
    name: "",
    children: "",
    type: "",
    teacher: "",
  });

  const fetchChildrenAndTeachersForNewGroup = async () => {
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

  const fetchChildrenAndTeachersToEditGroup = async () => {
    const responses = await Promise.all([
      fetch(`${API.CHILDREN}?group=${id}`, { credentials: "include" }),
      fetch(API.TEACHER, { credentials: "include" }),
      fetch(`${API.CHILDREN}?in_group=false`, { credentials: "include" }),
    ]);
    const jsons = responses.map((response) => {
      return response.json();
    });
    const data = await Promise.all(jsons);

    setGroupName(name);
    setGroupType(type);
    setChildren((prev) => ({
      ...prev,
      list: data[0],
      filtered: data[0],
      withoutGroup: data[2],
      filteredWithoutGroup: data[2],
      chosen: data[0].map((child) => child.id),
    }));
    setTeachers({ list: data[1], chosen: teacher.id });
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

  const handleTeacherOnChange = ({ target: { value } }) => {
    setTeachers((prev) => ({ ...prev, chosen: parseInt(value) }));
  };

  const handleTeacherOnClick = ({ target: { value } }) => {
    if (teachers.chosen === parseInt(value))
      setTeachers((prev) => ({ ...prev, chosen: null }));
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
    setError(errors);

    if (isValid) {
      const payload = {
        teacher: teachers.chosen,
        name: groupName,
        type: groupType,
        children: children.chosen,
      };
      const res = await callAPI(
        id ? `${API.GROUP}${id}` : API.GROUP,
        id ? "PATCH" : "POST",
        JSON.stringify(payload)
      );

      if (Boolean(res.teacher) && Boolean(res.teacher[0])) {
        setError((prev) => ({
          ...prev,
          teacher: "Wybrany nauczyciel jest już przydzielony do grupy",
        }));
        return;
      }
      handleModal();
      update(API.GROUP);
    }
  };

  useEffect(() => {
    setChildren((prev) => ({
      ...prev,
      filteredWithoutGroup: prev.withoutGroup.filter(filterFunction),
      filtered: prev.list.filter(filterFunction),
    }));
  }, [childKeyword]);

  useEffect(() => {
    if (id) {
      fetchChildrenAndTeachersToEditGroup();
      const currGroupTeacher = {
        name: teacher.name,
        surname: "",
        id: teacher.id,
      };
      setTeachers({ list: [currGroupTeacher], chosen: teacher.id });
    } else fetchChildrenAndTeachersForNewGroup();
  }, []);

  const filterFunction = (child) => {
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
  };

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

          {id && (
            <div className={styles.groupField}>
              <Text rouge gray s28 fMedium>
                Dzieci bez grupy
              </Text>

              <div className={styles.list}>
                {children.withoutGroup.length > 0 &&
                  children.filteredWithoutGroup.map((child) => (
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
          )}
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
                    onChange={handleTeacherOnChange}
                    onClick={handleTeacherOnClick}
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
