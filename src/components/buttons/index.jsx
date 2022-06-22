import React from "react";
import styles from "./index.module.css";

const Button = ({ children, onClick, id }) => {
  return (
    <button id={id} className={styles.container} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
