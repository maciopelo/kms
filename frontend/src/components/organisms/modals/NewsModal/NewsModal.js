import React, { useState, useEffect } from "react";
import styles from "./NewsModal.module.scss";
import ModalInputHeader from "../../../molecules/ModalInputHeader/ModalInputHeader";
import Text from "../../../atoms/Text/Text";
import Input from "../../../molecules/Input/Input";
import Button from "../../../atoms/Button/Button";
import FileInput from "../../../molecules/FileInput/FileInput";
import { useFormik } from "formik";
import { newsSchema } from "../../../../validators";
import useFetch from "../../../../hooks/useFetch";
import { API } from "../../../../api/urls";
import { useModalContext } from "../../../../store/contexts/ModalContext";

const NewsModal = () => {
  const { handleModal } = useModalContext();
  const { callAPI } = useFetch();
  const [files, setFiles] = useState({
    main: [],
    error: false,
  });

  const handleAddMainImage = ({ target: { files } }) => {
    const mainImg = files;
    setFiles((prev) => ({ ...prev, main: mainImg }));
    setFiles((prev) => ({ ...prev, error: false }));
  };

  const handleRemoveMainImage = () => {
    setFiles((prev) => ({ ...prev, main: [] }));
    setFiles((prev) => ({ ...prev, error: true }));
  };

  const checkFileField = () => {
    if (files.main.length === 0) {
      setFiles((prev) => ({ ...prev, error: true }));
    }
  };

  const formik = useFormik({
    initialValues: {
      header: "",
      description: "",
      date: "",
    },

    validationSchema: newsSchema,
    onSubmit: async (values) => {
      if (files.main.length === 0) {
        setFiles((prev) => ({ ...prev, error: true }));
        return;
      }

      const payload = {
        ...values,
        date: `2021-11-11T00:00`,
        main_image: files.main[0],
      };

      const formData = new FormData();

      Object.keys(payload).forEach((key) => {
        formData.append(key, payload[key]);
      });

      const res = await callAPI(`${API.NEWS}`, "POST", formData, null, {});

      if (res) {
        formik.resetForm();
        handleModal();
      }
    },
  });

  return (
    <div className={styles.wrapper}>
      <form onSubmit={formik.handleSubmit} id="news-form">
        <ModalInputHeader formik={formik} />

        <div className={styles.content}>
          <div className={styles.desc}>
            <Text s28 rouge fMedium>
              Opis
            </Text>
            <textarea
              className={styles.descTextarea}
              placeholder="Treść..."
              maxLength={500}
              data-invalid={Boolean(formik.errors.description)}
              {...formik.getFieldProps("description")}
            />
            <Text s10 rouge fRegular>
              {formik.errors.description}
            </Text>
          </div>
          <div className={styles.info}>
            <div className={styles.uploads}>
              <Text s28 rouge fMedium>
                Zdjęcia
              </Text>

              <FileInput
                files={files.main}
                text="Główne"
                multiple={false}
                handleOnChange={handleAddMainImage}
                handleRemove={handleRemoveMainImage}
              />
              {files.error && (
                <Text s11 error fRegular>
                  wymagane
                </Text>
              )}
            </div>
            <div className={styles.date}>
              <Text s28 rouge fMedium>
                Data
              </Text>
              <Input
                name="date"
                type="text"
                placeholder="dd-mm-rrrr"
                error={formik.errors.date}
                touched={formik.touched.date}
                {...formik.getFieldProps("date")}
              />
            </div>
          </div>
          <div className={styles.save}>
            <Button form="news-form" type="submit" onClick={checkFileField}>
              zapisz
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewsModal;
