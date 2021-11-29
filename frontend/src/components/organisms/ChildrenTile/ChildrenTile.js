import React, { useState } from "react";
import styles from "./ChildrenTile.module.scss";
import girl from "../../../assets/images/girl.png";
import boy from "../../../assets/images/boy.png";
import money from "../../../assets/icons/money.svg";
import cutlery from "../../../assets/icons/cutlery.svg";
import Text from "../../atoms/Text/Text";

const ChildrenTile = ({ children }) => {
  const [currChild, setCurrChild] = useState(children[0]);

  const handleChildrenChange = ({ target: { value } }) => {
    setCurrChild(children.filter((child) => child.id === parseInt(value))[0]);
  };
  return (
    <div className={styles.childrenWrappper}>
      <div
        className={`${styles.child} ${
          currChild.gender === "M" ? styles.male : ""
        }`}
      >
        <div className={styles.name}>
          <Text s44 gray fMedium>
            {currChild.name}
          </Text>
          <Text s44 gray fMedium>
            {currChild.surname}
          </Text>
        </div>

        {currChild.gender === "M" ? (
          <img src={boy} alt="Boy Icon" />
        ) : (
          <img src={girl} alt="Girl Icon" />
        )}
      </div>

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

export default ChildrenTile;
