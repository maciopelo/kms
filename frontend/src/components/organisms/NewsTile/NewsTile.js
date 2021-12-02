import React from "react";
import styles from "./NewsTile.module.scss";
import { BASE_URL } from "../../../api/urls";
import Text from "../../atoms/Text/Text";
import { Link } from "react-router-dom";

const NewsTile = ({ news }) => {
  const { id, main_image, header, date, description } = news;

  return (
    <div className={styles.newsTileWrapper}>
      <div
        className={styles.mainImage}
        style={{ backgroundImage: `url(${BASE_URL}${main_image})` }}
      >
        <Link to={`/news/${id}`}>
          <div />
        </Link>
      </div>

      <div className={styles.newsTileContent}>
        <header className={styles.newsTileHeader}>
          <Text s44 gray fMedium uppercase>
            {header}
          </Text>
        </header>

        <div className={styles.newsTileDesc}>
          <Text s20 gray fMedium>
            {`${date.substring(0, 10)} r.`}
          </Text>
          <Text s16 gray fRegular lh24>
            {description.length > 500
              ? `${description.substring(0, 500)}...`
              : description}
          </Text>
          <div className={styles.readMore}>
            <Text s20 gray fMedium>
              <Link to={`/news/${id}`}>Czytaj dalej</Link>
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsTile;
