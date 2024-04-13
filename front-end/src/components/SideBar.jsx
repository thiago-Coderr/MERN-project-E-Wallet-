import React, { useState } from "react";
import styles from "./SideBar.module.scss";
import HomeIcon from "./HomeIcon";
import RecipientsIcon from "./RecipientsIcon";
import PaymentsIcon from "./PaymentsIcon";
import MainContent from "./MainContent";

function SideBar({ username }) {
  const [homeTab, setHomeTab] = useState(true);
  const [paymentTab, setPaymentTab] = useState(false);
  const [recipientTab, setRecipientTab] = useState(false);

  function homeHandle() {
    setHomeTab(true);
    setPaymentTab(false);
    setRecipientTab(false);
  }

  function paymentHandle() {
    setHomeTab(false);
    setPaymentTab(true);
    setRecipientTab(false);
  }

  function recipientHandle() {
    setHomeTab(false);
    setPaymentTab(false);
    setRecipientTab(true);
  }

  return (
    <>
      <div className={styles.sidebar__container_fixed}>
        <div className={styles.logo__container}>
          <p className={styles.logo__container__logo}>PayMe</p>
          <span className={styles.logo__container__dot}>.</span>
        </div>
        <ul className={styles.sidebar__container_fixed_items}>
          <li
            className={homeTab ? styles.actualTab : styles.sidebar__item}
            onClick={homeHandle}
          >
            <div className={styles.sidebar__icon}>
              <HomeIcon />
            </div>
            <span>Home</span>
          </li>
          <li
            className={paymentTab ? styles.actualTab : styles.sidebar__item}
            onClick={paymentHandle}
          >
            <div className={styles.sidebar__icon}>
              <PaymentsIcon />
            </div>
            <span>Payments</span>
          </li>
          <li
            className={recipientTab ? styles.actualTab : styles.sidebar__item}
            onClick={recipientHandle}
          >
            <div className={styles.sidebar__icon}>
              <RecipientsIcon />
            </div>
            <span>Recipients</span>
          </li>
        </ul>
        <div className={styles.legal}>
          <p>&copy; 2024 by PayMe. All rights reserved.</p>
        </div>
      </div>
      <MainContent
        username={username}
        homeTab={homeTab}
        paymentTab={paymentTab}
        recipientTab={recipientTab}
      />
    </>
  );
}

export default SideBar;
