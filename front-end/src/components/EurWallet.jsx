import styles from "./BalanceItems.module.scss";
import EuRoundFlag from "./EuRoundFlag";

function EurWallet({ send, add, amount }) {
  function handleSendEur() {
    send(true);
  }

  function handleAddEur() {
    add(true);
  }

  return (
    <div className={styles.balance__items}>
      <div className={styles.balance}>
        <div className={styles.balance__icon}>
          <EuRoundFlag />
        </div>
        <p className={styles.balance__name}>EUR</p>
        <span className={styles.balance__actual}>{amount} €</span>
      </div>
      <div className={styles.send__add}>
        <span onClick={handleSendEur} className={styles.send__add_send}>
          Send
        </span>
        <span onClick={handleAddEur} className={styles.send__add_add}>
          Add
        </span>
      </div>
    </div>
  );
}

export default EurWallet;
