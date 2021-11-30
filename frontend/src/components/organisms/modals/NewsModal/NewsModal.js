import React, { useState } from "react";
import styles from "./NewsModal.module.scss";
import ModalInputHeader from "../../../molecules/ModalInputHeader/ModalInputHeader";
import Text from "../../../atoms/Text/Text";
import Input from "../../../molecules/Input/Input";
import Button from "../../../atoms/Button/Button";
import FileInput from "../../../molecules/FileInput/FileInput";
import { useFormik } from "formik";
import { newsSchema } from "../../../../validators";

const NewsModal = () => {
  const [files, setFiles] = useState({
    main: [],
    rest: [],
  });

  const handleAddMainImage = ({ target: { files } }) => {
    const mainImg = files;
    setFiles((prev) => ({ ...prev, main: mainImg }));
  };

  const handleRemoveMainImage = () => {
    setFiles((prev) => ({ ...prev, main: [] }));
  };

  const handleAddRestImages = ({ target: { files } }) => {
    const restImages = files;
    setFiles((prev) => ({ ...prev, rest: restImages }));
  };

  const handleRemoveRestImages = () => {
    setFiles((prev) => ({ ...prev, rest: [] }));
  };

  const formik = useFormik({
    initialValues: {
      header: "",
      description: "",
      date: "",
    },

    validationSchema: newsSchema,
    onSubmit: (values) => {
      console.log(values);
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

              <FileInput
                files={files.rest}
                text="Główne"
                multiple={true}
                handleOnChange={handleAddRestImages}
                handleRemove={handleRemoveRestImages}
              />
            </div>
            <div className={styles.date}>
              <Text s28 rouge fMedium>
                Data
              </Text>
              <Input
                name="date"
                type="text"
                placeholder="dd/mm/rrrr"
                error={formik.errors.date}
                touched={formik.touched.date}
                {...formik.getFieldProps("date")}
              />
            </div>
          </div>
          <div className={styles.save}>
            <Button form="news-form" type="submit">
              zapisz
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewsModal;
