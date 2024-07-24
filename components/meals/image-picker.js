"use client";
import { useRef, useState } from "react";

import styles from "./image-picker.module.css";
import Image from "next/image";

function ImagePicker({ label, name }) {
  const [image, setImage] = useState(null);
  const inputImage = useRef();

  function handlePickImage(e) {
    inputImage.current.click();
  }
  function handleImageFile(e) {
    const file = e.target.files[0];
    if (!file) {
      setImage(null);
      return;
    }
    const fileReader = new FileReader();

    fileReader.onload = () => {
      setImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  }

  return (
    <div className={styles.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.controls}>
        <div className={styles.preview}>
          {!image && <p>No Image picked yet.</p>}
          {image && (
            <Image src={image} alt="The image selected by user." fill />
          )}
        </div>
        <input
          className={styles.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={inputImage}
          onChange={handleImageFile}
          required
        />
        <button
          className={styles.button}
          type="button"
          onClick={handlePickImage}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}

export default ImagePicker;
