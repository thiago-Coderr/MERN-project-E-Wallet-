import styles from "./BalanceItems.module.scss";
import UsRoundFlag from "./UsRoundFlag";

function UsdWallet({ send, add, amount }) {
  function handleSendUsd() {
    send(true);
  }

  function handleAddUsd() {
    add(true);
  }

  return (
    <div className={styles.balance__items}>
      <div className={styles.balance}>
        <div className={styles.balance__icon}>
          <UsRoundFlag />
        </div>
        <p className={styles.balance__name}>USD</p>
        <span className={styles.balance__actual}>{amount} $</span>
      </div>
      <div className={styles.send__add}>
        <span onClick={handleSendUsd} className={styles.send__add_send}>
          Send
        </span>
        <span onClick={handleAddUsd} className={styles.send__add_add}>
          Add
        </span>
      </div>
    </div>
  );
}

export default UsdWallet;
