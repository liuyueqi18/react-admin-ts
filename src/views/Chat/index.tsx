import React, { useEffect, useRef } from "react";

import { useState } from "react";
import { Input, Switch } from "antd";

import { ChatContentModel } from "../../model/Chat";
import styles from "../../styles/Chat/Chat.module.css";
import { getMessageApi, pushMessage } from "../../service/chat";
import dayjs from "dayjs";
import { cryptoDecrypt, cryptoEncrypt } from "../../service/crypto";

export default function Chat() {
  const RYMUSERID = localStorage.getItem("RYMUSERID");
  const USERINFO = JSON.parse(localStorage.getItem("USERINFO")!);
  const [message, setMessage] = useState("");
  const [content, setContent] = useState<ChatContentModel[]>([]);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  let int = useRef<NodeJS.Timeout>();

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMessage(e.target.value);
  };
  const onPressEnter = () => {
    if (
      RYMUSERID !== "6332c4789fb19a5e1980d306" &&
      RYMUSERID !== "5f8944b4a5451b51ab88d644"
    ) {
      return;
    }
    if (message !== "") {
      pushMessage({
        content: cryptoEncrypt(message),
        time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        userId: RYMUSERID!,
        userName: USERINFO.username,
      }).then(() => {
        setMessage("");
        getMessage();
        handlerSlide();
      });
    }
  };
  const getMessage = () => {
    if (
      RYMUSERID !== "6332c4789fb19a5e1980d306" &&
      RYMUSERID !== "5f8944b4a5451b51ab88d644"
    ) {
      return;
    }
    getMessageApi().then((res) => {
      const data = res.map((i) => {
        return {
          ...i,
          content: cryptoDecrypt(i.content),
          isSelf: i.userId === RYMUSERID,
        };
      });
      setContent(data);
      handlerSlide();
    });
  };

  const handlerSlide = () => {
    if (chatBoxRef && chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  };

  const onChangeSwitch = (checked: boolean) => {
    console.log("checked :>> ", checked);
    if (checked) {
      int.current = setInterval(() => {
        getMessage();
      }, 5000);
    } else {
      clearInterval(int.current);
    }
  };

  useEffect(() => {
    getMessage();
    onChangeSwitch(true);
    return () => {
      onChangeSwitch(false);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className={styles.switchClass}>
        <Switch
          checkedChildren="开启"
          unCheckedChildren="关闭"
          defaultChecked
          onChange={onChangeSwitch}
        />
      </div>
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
