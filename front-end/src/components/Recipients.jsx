import axios from "axios";
import Empty from "./Empty";
import UserIcon from "./UserIcon";
import Status from "./Status";
import styles from "./Recipients.module.scss";
import React, { useState, useEffect } from "react";

function Recipients() {
  const [recipients, setRecipients] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8000/auth/dash-board")
      .then((res) => {
        if (res.data.status) {
          setRecipients(res.data.user.recipients);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const reversedRecipients = recipients && recipients.reverse();

  return (
    <>
      {reversedRecipients && reversedRecipients.length === 0 ? (
        <div className={styles.no_recipients}>
          <Empty />
          <h2>No recipient added yet.</h2>
        </div>
      ) : (
        <>
          <ul className={styles.recipients__container}>
            {reversedRecipients &&
              reversedRecipients.map((transfer) => (
                <>
                  <li key={transfer._id} className={styles.recipients}>
                    <div className={styles.recipients_status}>
                      <Status />
                    </div>
                    <div className={styles.recipients_icon}>
                      <UserIcon />
                    </div>
                    <div className={styles.recipients_datas}>
                      <span className={styles.recipients_datas_name}>
                        {transfer.username}
                      </span>
                      <span className={styles.recipients_datas_email}>
                        {transfer.userEmail}
                      </span>
                    </div>
                  </li>
                </>
              ))}
          </ul>
        </>
      )}
    </>
  );
}

export default Recipients;
