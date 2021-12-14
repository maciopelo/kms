import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { API } from "../../api/urls";
import ChildTile from "../../components/molecules/ChildTile/ChildTile";
import useFetch from "../../hooks/useFetch";
import styles from "./ChildrenTemplate.module.scss";
import GenericPage from "../GenericPage/GenericPage";
import Text from "../../components/atoms/Text/Text";
import edit from "../../assets/icons/edit.svg";
import { useModalContext } from "../../store/contexts/ModalContext";
import ChildModal from "../../components/organisms/modals/ChildModal/ChildModal";

const ChildrenTemplate = () => {
  const { id } = useParams();

  const { data, setData, isLoading, callAPI } = useFetch();
  const { handleModal } = useModalContext();
  const [child, setChildren] = useState([]);

  useEffect(() => {
    callAPI(`${API.CHILDREN}${id}`);
  }, []);

  useEffect(() => {
    setChildren(data);
  }, [data]);

  console.log(child);
  return (
    <GenericPage>
      <div className={styles.childInfoWrapper}>
        {data && !isLoading && (
          <>
            <div className={styles.childTile}>
              <img
                onClick={() =>
                  handleModal(<ChildModal child={child} update={callAPI} />)
                }
                src={edit}
                alt="Edit Icon"
              />
              <ChildTile child={child} clickable={false} />
            </div>

            <div className={styles.childInfoColumn}>
              <div className={styles.childSingleInfo}>
                <Text s24 rouge fMedium>
                  Data urodzenia
                </Text>
                <div>
                  <Text s18 gray fMedium>
                    {child.date_of_birth}
                  </Text>
                </div>
              </div>

              <div className={styles.childSingleInfo}>
                <Text s24 rouge fMedium>
                  PESEL
                </Text>
                <div>
                  <Text s18 gray fMedium>
                    {child.pesel}
                  </Text>
                </div>
              </div>

              <div className={styles.childSingleInfo}>
                <Text s24 rouge fMedium>
                  Opcje żywieniowe
                </Text>
                <div>
                  <Text s18 gray fMedium>
                    {`${child.eats_breakfast ? "śniadnaie, " : ""}${
                      child.eats_dinner ? "obiad, " : ""
                    }${child.eats_supper ? "podwieczorek" : ""}`}
                  </Text>
                </div>
              </div>

              <div className={styles.childSingleInfo}>
                <Text s24 rouge fMedium>
                  W przedszkolu
                </Text>
                <div>
                  <Text s18 gray fMedium>
                    {`od godz. ${child.coming_hour.substring(
                      0,
                      5
                    )} do ${child.leaving_hour.substring(0, 5)}`}
                  </Text>
                </div>
              </div>

              <div className={styles.childSingleInfo}>
                <Text s24 rouge fMedium>
                  Adres zamieszkania
                </Text>
                <div>
                  <Text s18 gray fMedium>
                    {`ul. ${child.street} ${child.house_number},`}
                  </Text>
                  <Text s18 gray fMedium>
                    {`${child.city}`}
                  </Text>
                </div>
              </div>
            </div>

            <div className={styles.childInfoColumn}>
              <div className={styles.childSingleInfo}>
                <Text s24 rouge fMedium>
                  Choroby
                </Text>
                <div>
                  <Text s18 gray fMedium>
                    {child.sicknesses}
                  </Text>
                </div>
              </div>

              <div className={styles.childSingleInfo}>
                <Text s24 rouge fMedium>
                  Dodatkowe informacje
                </Text>
                <div>
                  <Text s18 gray fMedium>
                    {child.additional_info}
                  </Text>
                </div>
              </div>

              <div className={styles.childSingleInfo}>
                <Text s24 rouge fMedium>
                  Rodzice
                </Text>
                <div>
                  <Text s18 gray fMedium>
                    {`${child.parent_one}`}
                  </Text>

                  <Text s18 gray fMedium>
                    {`${child.parent_two}`}
                  </Text>
                </div>
              </div>

              <div className={styles.childSingleInfo}>
                <Text s24 rouge fMedium>
                  Osoby upoważnione do odbioru
                </Text>
                <div>
                  <Text s18 gray fMedium>
                    {child.authorized_person_one}
                  </Text>
                  <Text s18 gray fMedium>
                    {child.authorized_person_two}
                  </Text>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </GenericPage>
  );
};

export default ChildrenTemplate;
