import React, { useState } from "react";
import styles from "./ChildHomePanel.module.scss";
import money from "../../../assets/icons/money.svg";
import cutlery from "../../../assets/icons/cutlery.svg";
import Text from "../../atoms/Text/Text";
import ChildTile from "../../molecules/ChildTile/ChildTile";

const ChildHomePanel = ({ children }) => {
  const [currChild, setCurrChild] = useState(children[0]);

  const handleChildrenChange = ({ target: { value } }) => {
    setCurrChild(children.filter((child) => child.id === parseInt(value))[0]);
  };

  return (
    <div className={styles.childrenWrappper}>
      <ChildTile child={currChild} />

      <div className={styles.info}>
        {children.length > 1 && (
          <div className={styles.detail}>
            <select className={styles.dropdown} onChange={handleChildrenChange}>
              {children.map((child) => (
                <option
                  key={child.id}
                  value={child.id}
                >{`${child.name} ${child.surname}`}</option>
              ))}
            </select>
          </div>
        )}

        <div className={styles.detail}>
          <Text s24 gray fMedium>
            Opłaty
          </Text>
          <img src={money} alt="Dolar Icon" />
        </div>

        <div className={styles.detail}>
          <Text s24 gray fMedium>
            Jadłospis
          </Text>
          <img src={cutlery} alt="Cutlery Icon" />
        </div>
      </div>
    </div>
  );
};

export default ChildHomePanel;
