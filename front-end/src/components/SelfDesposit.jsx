import styles from "./SelfDeposit.module.scss";
import axios from "axios";
import Status from "./Status";
import React, { useState, useEffect } from "react";

function SelfDesposit() {
  const [selfdeposits, setSelfDeposits] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8000/auth/dash-board")
      .then((res) => {
        if (res.data.status) {
          setSelfDeposits(res.data.user.transactions);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const myDeposits =
    selfdeposits &&
    selfdeposits.filter(
      (deposit) => deposit.type === "deposit" && deposit.method !== "PayMe"
    );

  const reversedDeposits = myDeposits && myDeposits.reverse();

  return (
    <div className={styles.selfdeposit__container}>
      <h1 className={styles.title}>Self Deposits</h1>
      <ul className={styles.selfdeposit__records}>
        {reversedDeposits &&
          reversedDeposits.map((deposit) => (
            <>
              <li key={deposit._id} className={styles.transaction}>
                <span className={styles.transaction_method}>
                  {deposit.method}
                </span>
                <span className={styles.transaction_amount}>
                  {deposit.amount} {deposit.currency}
                </span>
                <span className={styles.transaction_dateTime}>
                  <span>{deposit.dateTime.date}</span>
                  <span>{deposit.dateTime.timeZone}</span>
                </span>
                <span className={styles.transaction_status}>
                  <span>Added</span>
                  <Status />
                </span>
              </li>
            </>
          ))}
      </ul>
    </div>
  );
}

export default SelfDesposit;
