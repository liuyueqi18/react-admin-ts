import React, { useEffect, useRef } from "react";

import { useState } from "react";
import { Input } from "antd";

import { ChatContentModel } from "../../model/Chat";
import styles from "../../styles/Chat/Chat.module.css";
import { getMessageApi, pushMessage } from "../../service/chat";
import dayjs from "dayjs";

const { TextArea } = Input;

export default function Chat() {
  const RYMUSERID = localStorage.getItem("RYMUSERID");
  const USERINFO = JSON.parse(localStorage.getItem("USERINFO")!);
  const [message, setMessage] = useState("");
  const [content, setContent] = useState<ChatContentModel[]>([]);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMessage(e.target.value);
  };
  const onPressEnter = () => {
    if (message !== "") {
      pushMessage({
        content: message,
        time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        userId: RYMUSERID!,
        userName: USERINFO.username,
      }).then((res) => {
        setMessage("");
        getMessage();
      });
    }
  };
  const getMessage = () => {
    getMessageApi().then((res) => {
      const data = res.map((i) => {
        return {
          ...i,
          isSelf: i.userId === RYMUSERID,
        };
      });
      setContent(data);
      console.log("chatBoxRef :>> ", chatBoxRef);
      if (chatBoxRef && chatBoxRef.current) {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
      }
    });
  };

  useEffect(() => {
    setInterval(() => {
      getMessage();
    }, 3000);
  }, []);

  return (
    <div>
      <div className={styles.chatBox} ref={chatBoxRef}>
        {content.map((el, idx) => {
          return (
            <div
              className={`${styles.messageItem} ${
                el.isSelf ? styles.rightMessage : styles.leftMessage
              }`}
              key={idx}
            >
              <div className={`${styles.messageContent}`}>
                <div className={styles.messageBox}>
                  <span
                    className={`${styles.content}  ${
                      el.isSelf ? styles.rightContent : styles.leftContent
                    }`}
                  >
                    {el.content}
                  </span>
                  <span
                    className={`${styles.time}  ${
                      el.isSelf ? styles.rightTime : styles.leftTime
                    }`}
                  >
                    {el.time}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Input
        value={message}
        onChange={onChange}
        onPressEnter={onPressEnter}
        style={{ marginTop: "16px" }}
      />
    </div>
  );
}
