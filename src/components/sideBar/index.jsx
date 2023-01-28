import styles from "./index.module.scss";

export const SideBar = () => {
  return (
    <div className={styles.container}>
      <div>Meu perfil</div>
      <div>Log Out</div>
    </div>
  );
};
