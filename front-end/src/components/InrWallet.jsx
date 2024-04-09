import InRoundFlag from "./InRoundFlag";
import styles from "./BalanceItems.module.scss";

function InrWallet({ send, add, amount }) {
  function handleSendInr() {
    send(true);
  }

  function handleAddInr() {
    add(true);
  }
  return (
    <div className={styles.balance__items}>
      <div className={styles.balance}>
        <div className={styles.balance__icon}>
          <InRoundFlag />
        </div>
        <p className={styles.balance__name}>INR</p>
        <span className={styles.balance__actual}>{amount} ₹</span>
      </div>
      <div className={styles.send__add}>
        <span onClick={handleSendInr} className={styles.send__add_send}>
          Send
        </span>
        <span onClick={handleAddInr} className={styles.send__add_add}>
          Add
        </span>
      </div>
    </div>
  );
}

export default InrWallet;
