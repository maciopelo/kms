import React, { useState, useEffect } from "react";
import styles from "./ChildrenList.module.scss";
import ChildTile from "../../molecules/ChildTile/ChildTile";
import Text from "../../atoms/Text/Text";
import arrow from "../../../assets/icons/arrow.svg";

const ChildrenList = ({ data, children, setChildren }) => {
  const [layout, setLayout] = useState(true);
  const [sortOrder, setSortOrder] = useState(false);

  const handleSort = () => {
    setSortOrder((prev) => !prev);
  };

  const handleLayout = () => {
    setLayout((prev) => !prev);
  };

  useEffect(() => {
    setChildren(
      [...data].sort((a, b) => (sortOrder && a.name > b.name ? 1 : -1))
    );
  }, [sortOrder]);

  return (
    <div className={styles.childrenListWrapper}>
      <div className={styles.childrenListSettings}>
        <button className={styles.sortButton} onClick={handleSort}>
          <Text s24 gray fRegular>
            A-Z
          </Text>
          <img src={arrow} alt="Arrow" data-asc={sortOrder} />
        </button>
        <div className={styles.layoutButtons}>
          <button
            className={styles.gridButton}
            data-isgrid={layout}
            onClick={handleLayout}
          >
            <div />
            <div />
            <div />
            <div />
          </button>

          <button
            className={styles.listButton}
            data-islist={!layout}
            onClick={handleLayout}
          >
            <div />
            <div />
            <div />
          </button>
        </div>
      </div>
      <div className={styles.childrenList} data-linear={!layout}>
        {children &&
          children.map((child) => (
            <ChildTile key={child.pesel} child={child} />
          ))}
      </div>
    </div>
  );
};

export default ChildrenList;
