import styles from "./BalanceItems.module.scss";
import UkRoundFlag from "./UkRoundFlag";

function GbpWallet({ send, add, amount }) {
  function handleSendGbp() {
    send(true);
  }

  function handleAddGbp() {
    add(true);
  }

  return (
    <div className={styles.balance__items}>
      <div className={styles.balance}>
        <div className={styles.balance__icon}>
          <UkRoundFlag />
        </div>
        <p className={styles.balance__name}>GBP</p>
        <span className={styles.balance__actual}>{amount} £</span>
      </div>
      <div className={styles.send__add}>
        <span onClick={handleSendGbp} className={styles.send__add_send}>
          Send
        </span>
        <span onClick={handleAddGbp} className={styles.send__add_add}>
          Add
        </span>
      </div>
    </div>
  );
}

export default GbpWallet;
