import React from "react";
import styles from "./index.module.css";
import clsx from "clsx";

const Button = ({ children, onClick, id, className }) => {
  return (
    <button
      id={id}
      className={clsx(styles.container, className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
