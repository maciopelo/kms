import React, { useState, useEffect } from "react";
import styles from "./FilterPanel.module.scss";
import Input from "../../molecules/Input/Input";
import { API } from "../../../api/urls";
import Text from "../../atoms/Text/Text";
import Button from "../../atoms/Button/Button";
import RadioOrCheckbox from "../../molecules/RadioOrCheckbox/RadioOrCheckbox";

const FilterPanel = ({ data, setChildren }) => {
  const [groups, setGroups] = useState([]);

  const [chosenGender, setChosenGender] = useState("");
  const [chosenGroups, setChosenGroups] = useState([]);
  const [chosenKeyword, setChosenKeyword] = useState("");

  useEffect(() => {
    const fetchGroups = async () => {
      const res = await fetch(API.GROUP, { credentials: "include" });
      const data = await res.json();
      setGroups(data);
    };

    fetchGroups();
  }, []);

  const handleGender = ({ target: { value } }) => {
    setChosenGender(value);
  };

  const handleGroup = ({ target: { value } }) => {
    const intValue = parseInt(value);
    if (chosenGroups.includes(intValue)) {
      setChosenGroups((prev) => prev.filter((group) => group !== intValue));
      return;
    }

    setChosenGroups((prev) => [...prev, intValue]);
  };

  const handleKeyword = ({ target: { value } }) => {
    setChosenKeyword(value.trim().toLowerCase());
  };

  const resetFilters = () => {
    setChosenGender("");
    setChosenGroups([]);
    setChosenKeyword("");
    setChildren(data);
  };

  const handleFilter = () => {
    const childrenResult = data
      .filter((child) => {
        if (Boolean(chosenKeyword)) {
          return (
            child.name.toLowerCase().includes(chosenKeyword) ||
            child.surname.toLowerCase().includes(chosenKeyword)
          );
        }

        return true;
      })
      .filter((child) => {
        if (Boolean(chosenGender)) {
          return child.gender === chosenGender;
        }

        return true;
      })
      .filter((child) => {
        if (Boolean(chosenGroups.length)) {
          return chosenGroups.includes(child.group);
        }

        return true;
      });

    setChildren(childrenResult);
  };

  return (
    <div className={styles.filterPanelWrapper}>
      <div className={styles.filterPanel}>
        <div className={styles.findInput}>
          <Input
            icon="find"
            name="find"
            type="text"
            placeholder="szukaj"
            value={chosenKeyword}
            onChange={handleKeyword}
          />
        </div>

        <div className={styles.filterCategory}>
          <Text s24 fBold gray>
            Płeć
          </Text>
          <ul className={styles.filterItems}>
            <li>
              <RadioOrCheckbox
                type="radio"
                id="M"
                checked={"M" === chosenGender}
                onChange={handleGender}
                text="chłopcy"
              />
            </li>
            <li>
              <RadioOrCheckbox
                type="radio"
                id="F"
                checked={"F" === chosenGender}
                onChange={handleGender}
                text="dziewczyny"
              />
            </li>
          </ul>
        </div>

        <div className={styles.filterCategory}>
          <Text s24 fBold gray>
            Grupa
          </Text>
          <ul className={styles.filterItems}>
            {data &&
              groups.length > 0 &&
              groups.map((group) => {
                const count = data.filter((child) => child.group === group.id)
                  .length;

                return (
                  <li key={group.id}>
                    <RadioOrCheckbox
                      type="checkbox"
                      id={group.id}
                      checked={chosenGroups.includes(group.id)}
                      onChange={handleGroup}
                      text={`${group.name} (${count})`}
                    />
                  </li>
                );
              })}
          </ul>
        </div>

        <div className={styles.filterBottom}>
          <Text hover s16 gray fBold onClick={resetFilters}>
            resetuj
          </Text>
          <Button onClick={handleFilter}>filtruj</Button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
