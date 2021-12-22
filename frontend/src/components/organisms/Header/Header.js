import React, { useState, useEffect } from "react";
import styles from "./Header.module.scss";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../../store/contexts/AuthContext";
import { useHistory } from "react-router";
import { logoutUser } from "../../../store/actions";
import { v4 as uuidv4 } from "uuid";
import loginKids from "../../../assets/images/login-kids.png";
import Text from "../../atoms/Text/Text";
import SvgIcon from "../../atoms/SvgIcon/SvgIcon";
import ToggleButton from "../../atoms/ToggleButton/ToggleButton";

const NAV = {
  HEADMASTER: [
    { name: "Aktualności", path: "/news" },
    { name: "Dzieci", path: "/children" },
    { name: "Grupy", path: "/groups" },
    // TODO: in future  { name: "Pracownicy", path: "/employees" },
    { name: "Chat", path: "/chat" },
    // TODO: in future { name: "O przedszkolu", path: "/about" },
    { name: "Pliki", path: "/files" },
  ],

  TEACHER: [
    { name: "Aktualności", path: "/news" },
    { name: "Grupy", path: "/groups" },
    // TODO: in future  { name: "Pracownicy", path: "/employees" },
    { name: "Chat", path: "/chat" },
    // TODO: in future  { name: "O przedszkolu", path: "/about" },
    { name: "Pliki", path: "/files" },
  ],

  PARENT: [
    { name: "Aktualności", path: "/news" },
    { name: "Chat", path: "/chat" },
    // TODO: in future  { name: "O przedszkolu", path: "/about" },
    { name: "Pliki", path: "/files" },
  ],
};

const Header = () => {
  let history = useHistory();
  const {
    authState: {
      user: { type },
    },
    dispatch,
  } = useAuthContext();

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await logoutUser(dispatch);
    history.push("/login");
  };

  const redirectHome = () => {
    history.push("/home");
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.themeToggle}>
          <ToggleButton />
        </div>

        <nav className={styles.layout}>
          <img
            onClick={redirectHome}
            draggable="false"
            className={styles.logo}
            src={loginKids}
            alt={`Logo`}
          />

          <ul className={styles.list}>
            {NAV[type].map((link) => {
              return (
                <li className={styles.item} key={uuidv4()}>
                  <NavLink to={link.path} className={styles.link}>
                    {link.name}
                  </NavLink>
                </li>
              );
            })}

            <li className={styles.item}>
              <div className={styles.logout}>
                <SvgIcon icon="logout" onClick={handleLogout} />
              </div>
            </li>
          </ul>
          <div
            className={styles.hamburger}
            data-open={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span className={styles.line}></span>
            <span className={styles.line}></span>
            <span className={styles.line}></span>
          </div>
        </nav>
      </header>
      <div className={styles.mobileMenu} data-open={isOpen}>
        <ul className={styles.mobileMenuList} data-open={isOpen}>
          {NAV[type].map((link) => {
            return (
              <li className={styles.mobileItem} key={uuidv4()}>
                <NavLink to={link.path} className={styles.link}>
                  <Text s44 gray fMedium>
                    {link.name}
                  </Text>
                </NavLink>
              </li>
            );
          })}

          <li className={styles.mobileItem} onClick={handleLogout}>
            <Text s44 gray fMedium>
              Wyloguj
            </Text>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
