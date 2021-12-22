import React, { useEffect, useState, useRef } from "react";
import GenericPage from "../../templates/GenericPage/GenericPage";
import { useAuthContext } from "../../store/contexts/AuthContext";
import styles from "./Files.module.scss";
import PlusButton from "../../components/atoms/PlusButton/PlusButton";
import { USER } from "../../utils/enums";
import { useModalContext } from "../../store/contexts/ModalContext";
import FilesModal from "../../components/organisms/modals/FilesModal/FilesModal";
import useFetch from "../../hooks/useFetch";
import { API, BASE_URL } from "../../api/urls";
import pdf from "../../assets/icons/pdf.svg";
import word from "../../assets/icons/word.svg";
import txt from "../../assets/icons/txt.svg";
import Text from "../../components/atoms/Text/Text";
import AreYouSureModal from "../../components/organisms/modals/AreYouSureModal/AreYouSureModal";
import { v4 as uuidv4 } from "uuid";
import SvgIcon from "../../components/atoms/SvgIcon/SvgIcon";

const Files = () => {
  const {
    authState: { user },
  } = useAuthContext();

  const { handleModal } = useModalContext();
  const { data, setData, isLoading, callAPI } = useFetch();

  useEffect(() => {
    callAPI(API.FILES);
  }, []);

  const handleProperFileIcon = (fileName) => {
    const extension = fileName.substring(fileName.length - 4);
    if (extension === ".doc" || extension === "docx") return word;
    if (extension === ".pdf") return pdf;
    if (extension === ".txt") return txt;
  };

  const handleFileDelete = async (fileId) => {
    const res = await fetch(`${API.FILES}${fileId}`, {
      method: "DELETE",
      credentials: "include",
    });
    const { id } = await res.json();
    setData((prev) => prev.filter((file) => file.id !== id));
  };

  return (
    <GenericPage>
      <ul className={styles.filesWrapper}>
        {data &&
          data
            .filter(({ permission }) => {
              if (user.type !== USER.PARENT) return true;

              if (user.type === permission) return true;
              else return false;
            })
            .map(({ file, id }, idx) => {
              const fileName = file.split("/")[3];
              const icon = handleProperFileIcon(fileName);
              return (
                <li className={styles.file} key={uuidv4()}>
                  <a
                    download={true}
                    href={`${BASE_URL}${file}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={icon} alt="File Icon" />
                  </a>
                  {user.type !== USER.PARENT && (
                    <SvgIcon
                      icon="bin"
                      onClick={() =>
                        handleModal(
                          <AreYouSureModal
                            question="Czy na pewno chcesz usunąć ten plik?"
                            onYes={() => handleFileDelete(id)}
                          />
                        )
                      }
                    />
                  )}

                  <Text s12 gray fRegular>
                    {fileName}
                  </Text>
                </li>
              );
            })}
      </ul>

      {user.type !== USER.PARENT && (
        <PlusButton
          onClick={() => handleModal(<FilesModal setData={setData} />)}
        />
      )}
    </GenericPage>
  );
};

export default Files;
