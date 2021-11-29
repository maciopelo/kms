import React, { useState, useEffect } from "react";
import styles from "./GroupsAnnouncements.module.scss";
import Text from "../../atoms/Text/Text";
import Button from "../../atoms/Button/Button";
import { API } from "../../../api/urls";
import { getUrlDateFormat, getDBDateFormat } from "../../../utils/dateHelpers";

const GroupsAnnouncements = ({ date }) => {
  const [chosenGroup, setChosenGroup] = useState(0);
  const [groups, setGroups] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [currAnnouncement, setCurrAnnouncement] = useState({
    text: "",
    id: -1,
  });

  const fetchGroupsAndAnnouncements = async () => {
    const responses = await Promise.all([
      fetch(API.GROUP, { credentials: "include" }),
      fetch(`${API.ANNOUNCEMENT}${getUrlDateFormat(date)}`, {
        credentials: "include",
      }),
    ]);
    const jsons = responses.map((response) => {
      return response.json();
    });
    const data = await Promise.all(jsons);

    setGroups(data[0]);
    setChosenGroup(data[0][0].id);
    setAnnouncements(data[1]);
    setCurrAnnouncement(data[1].text);
  };

  useEffect(() => {
    fetchGroupsAndAnnouncements();
  }, []);

  useEffect(() => {
    const announcement = announcements.filter((a) => {
      if (chosenGroup === -1) return a.is_for_all;

      return a.group === chosenGroup;
    });

    if (announcement.length > 0) {
      setCurrAnnouncement({
        id: announcement[0].id,
        text: announcement[0].text,
      });
      return;
    }

    setCurrAnnouncement({
      text: "",
      is_for_all: chosenGroup === -1 ? true : false,
      group: chosenGroup === -1 ? null : chosenGroup,
      date: `${getDBDateFormat(date)}T12:00`,
    });
  }, [chosenGroup, announcements]);

  const handleGroupChange = ({ target: { value } }) => {
    setChosenGroup(parseInt(value));
  };

  const handleAnnoucementSave = async () => {
    const method = typeof currAnnouncement.id === "undefined" ? "POST" : "PUT";
    const pk = method === "PUT" ? currAnnouncement.id : "";

    const res = await fetch(`${API.ANNOUNCEMENT}${pk}`, {
      method: method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currAnnouncement),
    });

    fetchGroupsAndAnnouncements();
    const data = await res.json();
    console.log(data);
  };

  return (
    <>
      <div className={styles.groupInfoHeader}>
        <Text s28 rouge fMedium>
          Ogłoszenia
        </Text>
        <select
          className={styles.dropdown}
          value={chosenGroup}
          onChange={handleGroupChange}
        >
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
          <option value="-1">Wszystkie</option>
        </select>
      </div>
      <textarea
        className={styles.groupInfoTextarea}
        placeholder="Co dzieci mają zrobić 15.10 ..."
        maxLength={500}
        value={currAnnouncement.text}
        onChange={(e) =>
          setCurrAnnouncement((prev) => ({ ...prev, text: e.target.value }))
        }
      />
      <div className={styles.save}>
        <Button onClick={handleAnnoucementSave}>zapisz</Button>
      </div>
    </>
  );
};

export default GroupsAnnouncements;
