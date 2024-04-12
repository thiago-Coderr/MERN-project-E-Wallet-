import styles from "./Payments.module.scss";
import empty from "./Recipients.module.scss";
import axios from "axios";
import Empty from "./Empty";
import Status from "./Status";

import React, { useState, useEffect } from "react";

function Payments() {
  const [payments, setPayments] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:8000/auth/dash-board")
      .then((res) => {
        if (res.data.status) {
          setPayments(res.data.user.transactions);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const withdrawals =
    payments &&
    payments.filter(
      (transfer) => transfer.status === "Sent" || transfer.status === "Received"
    );

  const reversedTransaction = withdrawals && withdrawals.reverse();

  return (
    <>
      {reversedTransaction && reversedTransaction.length === 0 ? (
        <div className={empty.no_recipients}>
          <Empty />
          <h2>No transfer done yet.</h2>
        </div>
      ) : (
        <>
          <ul className={styles.payments__container}>
            {reversedTransaction &&
              reversedTransaction.map((transfer) =>
                transfer.status === "Sent" ? (
                  <>
                    <li key={transfer._id} className={styles.transaction}>
                      <span className={styles.transaction_name}>Me</span>
                      <span className={styles.transaction_method}>
                        {transfer.method}
                        <span className={styles.transaction_method_dot}>.</span>
                      </span>
                      <span className={styles.transaction_amount}>
                        {transfer.amount} {transfer.currency}
                      </span>
                      <span className={styles.transaction_date}>
                        <span>{transfer.dateTime.date}</span>
                        <span>{transfer.dateTime.timeZone}</span>
                      </span>
                      <span className={styles.transaction_status}>
                        {transfer.status}
                        <Status />
                      </span>
                    </li>
                  </>
                ) : (
                  <>
                    <li key={transfer._id} className={styles.transaction}>
                      <span className={styles.transaction_name}>
                        {transfer.senderName}
                      </span>
                      <span className={styles.transaction_method}>
                        {transfer.method}
                        <span className={styles.transaction_method_dot}>.</span>
                      </span>
                      <span className={styles.transaction_amount}>
                        {transfer.amount} {transfer.currency}
                      </span>
                      <span className={styles.transaction_email}>
                        {transfer.senderEmail}
                      </span>
                      <span className={styles.transaction_date}>
                        <span>{transfer.dateTime.date}</span>
                        <span>{transfer.dateTime.timeZone}</span>
                      </span>
                      <span className={styles.transaction_status}>
                        {transfer.status}
                        <Status />
                      </span>
                    </li>
                  </>
                )
              )}
          </ul>
        </>
      )}
    </>
  );
}

export default Payments;
