import React from "react";
import styles from "./FileInput.module.scss";
import Text from "../../atoms/Text/Text";
import upload from "../../../assets/icons/upload.svg";
import bin from "../../../assets/icons/bin.svg";

const FileInput = ({
  files,
  text,
  multiple,
  handleOnChange,
  handleRemove,
  ...rest
}) => {
  return (
    <div className={styles.customFileUpload}>
      <label>
        <Text s16 gray fRegular>
          {text}
          <img src={upload} alt="Upload Icon" />
        </Text>
        <input
          {...rest}
          name="mainImage"
          type="file"
          accept="image/png, image/gif, image/jpeg, image/jpg"
          multiple={multiple}
          onChange={handleOnChange}
        />
      </label>

      {files.length === 1 && (
        <Text s12 gray fRegular>
          {files[0].name.length > 15
            ? `${files[0].name.substring(0, 10)}...`
            : files[0].name}
        </Text>
      )}
      {files.length > 1 && (
        <Text s12 gray fRegular>{`${files.length} zdjęcia/ć`}</Text>
      )}
      {files.length > 0 && (
        <img src={bin} alt="Bin Icon" onClick={handleRemove} />
      )}
    </div>
  );
};

export default FileInput;
