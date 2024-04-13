import MainNav from "./MainNav";
import Balances from "./Balances";
import Payments from "./Payments";
import Recipients from "./Recipients";
import SelfDeposit from "./SelfDesposit";
import styles from "./MainContent.module.scss";

function MainContent({ username, homeTab, paymentTab, recipientTab }) {
  return (
    <div className={styles.main__content__container}>
      <MainNav
        username={username}
        homeTab={homeTab}
        paymentTab={paymentTab}
        recipientTab={recipientTab}
      />
      <div className={styles.scroll_box}>
        {homeTab && (
          <>
            <Balances />
            <SelfDeposit />
          </>
        )}
        {paymentTab && <Payments />}
        {recipientTab && <Recipients />}
      </div>
    </div>
  );
}

export default MainContent;
