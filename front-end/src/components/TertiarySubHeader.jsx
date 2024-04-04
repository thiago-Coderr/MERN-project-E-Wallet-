import styles from "./TertiarySubHeader.module.scss";
import phone_picture from "../img/borderless-phone.jpg";

function TertiarySubHeader() {
  return (
    <div className={styles.tertiarySubHeader}>
      <div>
        <img
          src={phone_picture}
          alt="application in a phone"
          className={styles.main__picture}
        />
      </div>
      <div className={styles.tertiarySubHeader__content}>
        <div className={styles.tertiarySubHeader__content__main__text}>
          <span className={styles.new_style}>New</span>
          <h2>The PayMe multi-currency account</h2>
        </div>
        <div className={styles.tertiarySubHeader__content__secondary__text}>
          Keep track of your transfers on the go with the TransferWise mobile
          app. Make new or repeat transfers - wherever you are - at the touch of
          a button.
        </div>
        <ul className={styles.btn__learn__more}>
          <li>Learn more</li>
        </ul>
      </div>
    </div>
  );
}

export default TertiarySubHeader;
