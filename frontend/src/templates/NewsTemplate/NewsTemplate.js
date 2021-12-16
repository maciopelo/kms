import React, { useEffect } from "react";
import { useParams } from "react-router";
import styles from "./NewsTemplate.module.scss";
import useFetch from "../../hooks/useFetch";
import { API, BASE_URL } from "../../api/urls";
import Text from "../../components/atoms/Text/Text";
import GenericPage from "../GenericPage/GenericPage";
import { parseUTCDateString } from "../../utils/dateHelpers";

const NewsTemplate = () => {
  const { id } = useParams();

  const { data, setData, isLoading, callAPI } = useFetch();

  useEffect(() => {
    callAPI(`${API.NEWS}${id}`);
  }, []);

  return (
    <GenericPage>
      {data && !isLoading && (
        <div className={styles.newsTemplateWrapper}>
          <header className={styles.newsTemplateHeader}>
            <Text s44 gray fMedium uppercase>
              {data.news.header}
            </Text>
            <div
              className={styles.newsTemplateMainImage}
              style={{
                backgroundImage: `url(${BASE_URL}${data.news.main_image})`,
              }}
            />
            <div className={styles.newsTemplateDate}>
              <Text s20 gray fBold>
                {`${parseUTCDateString(data.news.date)} r.`}
              </Text>
            </div>
          </header>
          <div className={styles.newsTemplateDescription}>
            <Text lh40 gray fRegular s24>
              {data.news.description}
            </Text>
          </div>
          <div className={styles.gallery}>
            {data.news_files.map((img, idx) => {
              return (
                <div
                  key={idx}
                  className={styles.singleImg}
                  style={{
                    backgroundImage: `url(${BASE_URL}${img.file})`,
                  }}
                >
                  <img src={`${BASE_URL}${img.file}`} alt="Gallery" />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </GenericPage>
  );
};

export default NewsTemplate;
