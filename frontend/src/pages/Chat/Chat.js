import React, { useEffect, useState } from "react";
import GenericPage from "../../templates/GenericPage/GenericPage";
import { useAuthContext } from "../../store/contexts/AuthContext";
import Pusher from "pusher-js";
import useFetch from "../../hooks/useFetch";
import { API } from "../../api/urls";
import Text from "../../components/atoms/Text/Text";
import { USER } from "../../utils/enums";
import styles from "./Chat.module.scss";
import send from "../../assets/icons/send.svg";
import { v4 as uuidv4 } from "uuid";
import { parseText } from "../../utils/helpers";
import SvgIcon from "../../components/atoms/SvgIcon/SvgIcon";

const Chat = () => {
  const {
    authState: { user },
  } = useAuthContext();

  const { data, isLoading, callAPI } = useFetch();
  const [personToChatWith, setPersonToChatWith] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  let allMessages = [];

  useEffect(() => {
    callAPI(API.USERS);

    const pusher = new Pusher("3d26a9986ae61c44154e", {
      cluster: "eu",
    });

    const channel = pusher.subscribe("chat");
    channel.bind("message", function(data) {
      allMessages.push(data);
      setMessages(allMessages);
    });
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();

    if (personToChatWith && message.trim().length > 0) {
      await fetch("http://localhost:8000/api/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: user.id,
          receiver: personToChatWith.id,
          message,
        }),
      });

      setMessage("");
    }
  };

  return (
    <GenericPage>
      <div className={styles.container}>
        <div className={styles.peopleToChatListWrapper}>
          <div className={styles.peopleToChatList}>
            {data &&
              !isLoading &&
              data.map((person) => {
                if (user.type !== USER.PARENT) {
                  return person.type === USER.PARENT ? (
                    <button
                      key={person.id}
                      onClick={() => setPersonToChatWith(person)}
                      className={styles.personToChat}
                      data-chosen={
                        personToChatWith && person.id === personToChatWith.id
                      }
                    >
                      <Text s16 gray fRegular>
                        {`${person.name} ${person.surname}`}
                      </Text>
                    </button>
                  ) : null;
                } else {
                  return person.type !== USER.PARENT ? (
                    <button
                      key={person.id}
                      onClick={() => setPersonToChatWith(person)}
                      className={styles.personToChat}
                      data-chosen={
                        personToChatWith && person.id === personToChatWith.id
                      }
                    >
                      <Text s16 gray fRegular>
                        {`${person.name} ${person.surname}`}
                      </Text>
                    </button>
                  ) : null;
                }
              })}
          </div>
        </div>

        <div className={styles.chatWrapper}>
          <div className={styles.chatPersonName}>
            {personToChatWith ? (
              <Text
                s24
                gray
                fMedium
              >{`${personToChatWith.name} ${personToChatWith.surname}`}</Text>
            ) : (
              <Text s24 rouge fMedium>
                Wybierz osobę
              </Text>
            )}
          </div>
          <div className={styles.chatMessages}>
            {messages.map((message) => {
              return (
                <div
                  key={uuidv4()}
                  className={styles.message}
                  data-sender={user.id === message.sender}
                >
                  <Text s16 gray fRegular>
                    {parseText(message.message)}
                  </Text>
                </div>
              );
            })}
          </div>

          <div className={styles.chatInput}>
            <textarea
              disabled={!personToChatWith}
              className={styles.messageInput}
              type="text"
              placeholder="wiadomość"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <SvgIcon onClick={handleSend} icon="send" />
          </div>
        </div>
      </div>
    </GenericPage>
  );
};

export default Chat;
