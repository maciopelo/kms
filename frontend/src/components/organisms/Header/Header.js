import React from "react";
import styles from "./Header.module.scss";
import { NavLink } from "react-router-dom";
import logout from "../../../assets/icons/logout.svg";
import { useAuthContext } from "../../../store/contexts/AuthContext";
import { useHistory } from "react-router";
import { logoutUser } from "../../../store/actions";
import { v4 as uuidv4 } from "uuid";

const NAV = {
  HEADMASTER: [
    { name: "Aktualności", path: "/news" },
    { name: "Dzieci", path: "/kids" },
    { name: "Grupy", path: "/groups" },
    { name: "Pracownicy", path: "/employees" },
    { name: "Chat", path: "/chat" },
    { name: "O przedszkolu", path: "/about" },
    { name: "Pliki", path: "/files" },
  ],

  TEACHER: [
    { name: "Aktualności", path: "/news" },
    { name: "Grupy", path: "/groups" },
    { name: "Pracownicy", path: "/employees" },
    { name: "Chat", path: "/chat" },
    { name: "O przedszkolu", path: "/about" },
    { name: "Pliki", path: "/files" },
  ],

  PARENT: [
    { name: "Aktualności", path: "/news" },
    { name: "Chat", path: "/chat" },
    { name: "O przedszkolu", path: "/about" },
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

  const handleLogout = async () => {
    await logoutUser(dispatch);
    history.push("/login");
  };

  return (
    <header className={styles.header}>
      <nav className={styles.layout}>
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
        </ul>
        <img
          onClick={handleLogout}
          src={logout}
          alt="Logout Icon"
          className={styles.logout}
        />
      </nav>
    </header>
  );
};

export default Header;
