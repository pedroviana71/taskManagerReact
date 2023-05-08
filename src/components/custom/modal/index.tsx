import clsx from "clsx";
import styles from "./index.module.scss";

interface ModalProps {
  children: React.ReactNode;
  type?: "alert" | "delete";
}

const Modal = ({ children, type }: ModalProps) => {
  return (
    <div className={clsx(type === "alert" ? styles.alert : styles.delete)}>
      {children}
    </div>
  );
};

export default Modal;
