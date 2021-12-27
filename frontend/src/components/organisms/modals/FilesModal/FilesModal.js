import React, { useState } from "react";
import { useModalContext } from "../../../../store/contexts/ModalContext";
import Cross from "../../../atoms/Cross/Cross";
import styles from "./FilesModal.module.scss";
import Text from "../../../atoms/Text/Text";
import RadioOrCheckbox from "../../../molecules/RadioOrCheckbox/RadioOrCheckbox";
import Button from "../../../atoms/Button/Button";
import bin from "../../../../assets/icons/bin.svg";
import { v4 as uuidv4 } from "uuid";
import { API } from "../../../../api/urls";
import useFetch from "../../../../hooks/useFetch";
import { USER } from "../../../../utils/enums";

const MAX_FILES_SIZE_IN_BYTES = 10_000_000;
const EXTENSIONS = [".doc", "docx", ".pdf", ".txt"];

const FilesModal = ({ setData }) => {
  const { callAPI } = useFetch();
  const { handleModal } = useModalContext();
  const [permission, setPermission] = useState(null);
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({ permission: "", files: "" });

  const handlePermissionOnChange = ({ target: { value } }) => {
    setPermission(value);
  };

  const handleFilesOnChange = ({ target: { files } }) => {
    const filesSize = Array.from(files).reduce(
      (acc, file) => file.size + acc,
      0
    );
    console.log(files);
    if (filesSize > MAX_FILES_SIZE_IN_BYTES) {
      setErrors((prev) => ({
        ...prev,
        files: "Maksymalna wielkość plików to 10mb.",
      }));
      setTimeout(() => {
        setErrors((prev) => ({
          ...prev,
          files: "",
        }));
      }, 4000);
      return;
    } else if (files.length > 10) {
      setErrors((prev) => ({
        ...prev,
        files: "Maksymalna ilość plików to 10.",
      }));

      setTimeout(() => {
        setErrors((prev) => ({
          ...prev,
          files: "",
        }));
      }, 4000);
      return;
    }

    setFiles(
      Array.from(files).filter((file) =>
        EXTENSIONS.includes(file.name.substring(file.name.length - 4))
      )
    );
  };

  const handleFileDelete = (file) => {
    setFiles((prev) => Array.from(prev).filter((f) => f !== file));
  };

  const handleFilesAdd = async () => {
    let error = false;
    if (!Boolean(permission)) {
      setErrors((prev) => ({
        ...prev,
        permission: "Nie wybrano uprawnień.",
      }));
      error = true;
    } else {
      setErrors((prev) => ({
        ...prev,
        permission: "",
      }));
    }

    if (!Boolean(files.length)) {
      setErrors((prev) => ({
        ...prev,
        files: "Nie wybrano żadnego pliku.",
      }));
      error = true;
    } else
      setErrors((prev) => ({
        ...prev,
        files: "",
      }));

    if (!error) {
      const formData = new FormData();
      formData.append("permission", permission);
      files.forEach((file, idx) => {
        formData.append(`file_${idx}`, file);
      });
      const res = await callAPI(API.FILES, "POST", formData, null, {});
      handleModal();
      setData((prev) => [...prev, ...res]);
    }
  };

  console.log(files);

  return (
    <div className={styles.filesModalWrapper}>
      <div className={styles.filesModalHeader}>
        <div className={styles.close}>
          <Cross onClick={handleModal} />
        </div>
      </div>

      <div className={styles.filesModalContent}>
        <Text s28 rouge fMedium>
          Uprawnienia pliku
        </Text>

        <div className={styles.filesModalPermissions}>
          <RadioOrCheckbox
            type="radio"
            id={USER.PARENT}
            value={USER.PARENT}
            checked={permission === USER.PARENT}
            onChange={handlePermissionOnChange}
            text="dla rodziców"
          />
          <RadioOrCheckbox
            type="radio"
            id={USER.TEACHER}
            value={USER.TEACHER}
            checked={permission === USER.TEACHER}
            onChange={handlePermissionOnChange}
            text="dla pracowników"
          />

          <Text s12 error fMedium>
            {Boolean(errors.permission) && errors.permission}
          </Text>
        </div>

        <div className={styles.filesModalUploadArea}>
          <label>
            <Text s16 gray fRegular>
              {files.length === 0 ? "przeciągnij pliki..." : ""}
            </Text>
            <ul>
              {Array.from(files).map((file) => (
                <li key={uuidv4()} className={styles.removeFile}>
                  <Text s16 gray fRegular>
                    {file.name.length > 34
                      ? `${file.name.substring(0, 34)}...`
                      : file.name}
                  </Text>
                  <img
                    src={bin}
                    alt="Bin Icon"
                    onClick={() => handleFileDelete(file)}
                  />
                </li>
              ))}
            </ul>

            <input
              disabled={files.length > 0 ? true : false}
              type="file"
              multiple={true}
              onChange={handleFilesOnChange}
              accept=".doc, .docx, .pdf, .txt"
            />
          </label>

          <Text s12 error fMedium>
            {Boolean(errors.files) && errors.files}
          </Text>

          <Text s12 gray fMedium>
            obłusigwane pliki: {EXTENSIONS.join(", ")}
          </Text>
        </div>

        <div className={styles.save}>
          <Button onClick={handleFilesAdd}>dodaj</Button>
        </div>
      </div>
    </div>
  );
};

export default FilesModal;
