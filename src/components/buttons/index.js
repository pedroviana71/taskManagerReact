import React from "react";
import styles from "./index.module.css";

const Button = ({ name, onClick }) => {
  return (
    <button className={styles.container}>
      <p>{name}</p>
    </button>
  );
};

export default Button;
