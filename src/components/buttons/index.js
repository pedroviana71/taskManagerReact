import React from "react";
import styles from "./index.module.css";

const Button = ({ children, onClick }) => {
  return (
    <button className={styles.container}>
      <p>{children}</p>
    </button>
  );
};

export default Button;
