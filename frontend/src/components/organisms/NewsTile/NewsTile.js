import React from "react";
import styles from "./NewsTile.module.scss";
import { BASE_URL } from "../../../api/urls";
import Text from "../../atoms/Text/Text";
import { Link } from "react-router-dom";
import bin from "../../../assets/icons/bin.svg";
import { useModalContext } from "../../../store/contexts/ModalContext";
import AreYouSureModal from "../modals/AreYouSureModal/AreYouSureModal";
import { useAuthContext } from "../../../store/contexts/AuthContext";
import { USER } from "../../../utils/enums";
import { API } from "../../../api/urls";

const NewsTile = ({ news, update }) => {
  const {
    authState: { user },
  } = useAuthContext();
  const { handleModal } = useModalContext();
  const { id, main_image, header, date, description } = news;

  const handleNewsRemove = async () => {
    const res = await fetch(`${API.NEWS}${news.id}`, {
      method: "DELETE",
      credentials: "include",
    });
    update(`${API.NEWS}`);
  };

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
        {user.type !== USER.PARENT && (
          <img
            className={styles.removeNewsButton}
            onClick={() =>
              handleModal(
                <AreYouSureModal
                  onYes={handleNewsRemove}
                  question="Czy na pewno chcesz usunąć ten post?"
                />
              )
            }
            src={bin}
            alt="Bin Icon"
          />
        )}

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
