import axios from "axios";
import styles from "./MainNav.module.scss";

function MainNav({ username, homeTab, paymentTab, recipientTab }) {
  function handleLogout() {
    axios
      .get("http://localhost:8000/auth/logout")
      .then((res) => {
        window.location = window.location.origin + "/login";
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className={styles.mainNav__container}>
      <div className={styles.currentTab}>
        {homeTab && "Balances"}
        {paymentTab && "Transfers"}
        {recipientTab && "Recipients"}
      </div>
      <div className={styles.userName__logout}>
        <span className={styles.userName__logout__username}>{username}</span>
        <button
          onClick={handleLogout}
          className={styles.userName__logout__logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default MainNav;
