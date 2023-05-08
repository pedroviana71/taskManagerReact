import clsx from "clsx";
import styles from "./index.module.scss";

interface InlineAlertProps {
  className?: string;
}

const InlineAlert = ({ className }: InlineAlertProps) => {
  return (
    <p className={clsx(styles.alert, className ? className : null)}>
      É preciso selecionar um nome e uma cor
    </p>
  );
};

export default InlineAlert;
