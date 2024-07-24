"use client";

import { handleDelete } from "@/lib/actions";
import styles from "./button.module.css";

import { useFormStatus } from "react-dom";

function Button({ slug, image }) {
  const { pending } = useFormStatus();
  return (
    <button
      className={styles.button}
      onClick={() => {
        if (confirm("Are you sure you want to delete reservation?"))
          handleDelete({ slug, image });
      }}
    >
      {pending ? "Deleting..." : "Delete"}
    </button>
  );
}

export default Button;
