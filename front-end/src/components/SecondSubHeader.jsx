import styles from "./SecondSubHeader.module.scss";
import AmericaFlag from "./AmericaFlag";
import CanadaFlag from "./CanadaFlag";
import EuropeFlag from "./EuropeFlag";
import BrazilFlag from "./BrazilFlag";
import GbFlag from "./GbFlag";
import FranceFlag from "./FranceFlag";
import AngolaFlag from "./AngolaFlag";
import AustraliaFlag from "./AustraliaFlag";

function SecondSubHeader() {
  return (
    <div className={styles.second__subHeader}>
      <div className={styles.second__subHeader__text}>
        <div className={styles.second__subHeader__text__primary}>
          <h2>Trusted all over the </h2>
          <h2>world</h2>
        </div>
        <div className={styles.second__subHeader__text__secondary}>
          <p>We move over $6 billion every month, and</p>
          <p>save people and businesses $3 million in </p>
          <p>hidden fees every day.</p>
        </div>
      </div>
      <div className={styles.second__subHeader__statistics}>
        <div className={styles.second__subHeader__statistics__elements}>
          <div className={styles.second__subHeader__statistics__elements__main}>
            <h2>14 offices</h2>
          </div>
          <div>
            <span
              className={styles.second__subHeader__statistics__elements__second}
            >
              around the world
            </span>
          </div>
        </div>

        <div className={styles.second__subHeader__statistics__elements}>
          <div className={styles.second__subHeader__statistics__elements__main}>
            <h2>$6 billion</h2>
          </div>
          <div>
            <span
              className={styles.second__subHeader__statistics__elements__second}
            >
              sent every month
            </span>
          </div>
        </div>

        <div className={styles.second__subHeader__statistics__elements}>
          <div className={styles.second__subHeader__statistics__elements__main}>
            <h2>9 million</h2>
          </div>
          <div>
            <span
              className={styles.second__subHeader__statistics__elements__second}
            >
              customers
            </span>
          </div>
        </div>

        <div className={styles.second__subHeader__statistics__elements}>
          <div className={styles.second__subHeader__statistics__elements__main}>
            <h2>$1.5 billion</h2>
          </div>
          <div>
            <span
              className={styles.second__subHeader__statistics__elements__second}
            >
              saved by customers every year
            </span>
          </div>
        </div>
      </div>

      <div className={styles.second__subHeader__summary}>
        <p>
          We’re available around the world, and we add new currencies all the
          time. If
        </p>
        <p>
          you think we should add a specific currency, let us know. Be the first
          to know
        </p>
        <p>
          when we add more by{" "}
          <span className={styles.style__underline}>
            signing up to our mailing list.
          </span>
        </p>
      </div>

      <div className={styles.flags}>
        <div className={styles.flags__and__name}>
          <EuropeFlag />
          <span>Europe</span>
        </div>

        <div className={styles.flags__and__name}>
          <GbFlag />
          <span>United Kingdom</span>
        </div>

        <div className={styles.flags__and__name}>
          <AngolaFlag />
          <span>Angola</span>
        </div>

        <div className={styles.flags__and__name}>
          <AmericaFlag />
          <span>United States</span>
        </div>

        <div className={styles.flags__and__name}>
          <BrazilFlag />
          <span>Brazil</span>
        </div>

        <div className={styles.flags__and__name}>
          <AustraliaFlag />
          <span>Australia</span>
        </div>

        <div className={styles.flags__and__name}>
          <CanadaFlag />
          <span>Canada</span>
        </div>

        <div className={styles.flags__and__name}>
          <FranceFlag />
          <span>France</span>
        </div>
      </div>

      <span className={styles.second__btn}>See all rout we cover</span>
    </div>
  );
}

export default SecondSubHeader;
