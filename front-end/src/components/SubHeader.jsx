import styles from "./SubHeader.module.scss";
import support_1 from "../img/support_1.jpg";
import support_2 from "../img/support_2.jpg";

function SubHeader() {
  return (
    <div className={styles.sub__content}>
      <div className={styles.sub__content__text}>
        <div className={styles.sub__content__text__main__text}>
          <h2>
            Global support in a range of languages
            <span className={styles.sub__title}>.</span>
          </h2>
        </div>
        <div className={styles.sub__content__text__secondary__text}>
          We don’t do complicated, automated systems. We have offices around the
          world, full of people ready to help you. Whenever you need it.
        </div>
        <button className={styles.sub__content__text__button}>
          Find out more
        </button>
      </div>
      <div className={styles.sub__content__pictures}>
        <img
          src={support_1}
          alt="support agent 1"
          className={styles.sub__content__pictures__support__1}
        />
        <img
          src={support_2}
          alt="support agent 2"
          className={styles.sub__content__pictures__support__2}
        />
      </div>
    </div>
  );
}

export default SubHeader;
