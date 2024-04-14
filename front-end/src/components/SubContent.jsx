import styles from "./SubContent.module.scss";
import doublegirl from "../img/doublegirl.jpg";
import girl1 from "../img/girl1.jpg";
import girl2 from "../img/girl2.jpg";

function SubContent() {
  return (
    <div className={styles.subcontent_container}>
      <div className={styles.text_content}>
        <div className={styles.text_content_main}>
          <h2>
            We’re building money without borders
            <span className={styles.blue_sky}>.</span>
          </h2>
        </div>

        <span className={styles.text_content_secondary}>
          The world’s banking systems weren’t designed for people without
          borders. That’s why we’re building a new one.
        </span>
        <ul className={styles.text_content_list}>
          <li className={styles.text_content_list_item}>
            <span className={styles.blue_sky}>1.</span> Be radically transparent
          </li>
          <li className={styles.text_content_list_item}>
            <span className={styles.blue_sky}>2.</span> Charge as little as
            possible
          </li>
          <li className={styles.text_content_list_item}>
            <span className={styles.blue_sky}>3.</span> Make premium the new
            normal
          </li>
        </ul>
        <div className={styles.text_content_btn}>Find out more</div>
      </div>
      <div className={styles.pictures_content}>
        <div>
          <img src={doublegirl} alt="two girls " className={styles.picture} />
        </div>
        <div>
          <img src={girl1} alt="white girl" className={styles.main_picture} />
        </div>
        <div>
          <img src={girl2} alt="black girl" className={styles.third_picture} />
        </div>
      </div>
    </div>
  );
}

export default SubContent;
