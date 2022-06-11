import React from "react";
import styles from "./index.module.scss";

const Selection = ({ name, onClick }) => {
  return (
    <button className={styles.container}>
      <p>{name}</p>
    </button>
  );
};

export default Selection;
