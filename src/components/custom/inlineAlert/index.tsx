import clsx from "clsx";
import styles from "./index.module.scss";

interface InlineAlertProps {
  className?: string;
  text: string;
}

const InlineAlert = ({ className, text }: InlineAlertProps) => {
  return (
    <p className={clsx(styles.alert, className ? className : null)}>{text}</p>
  );
};

export default InlineAlert;
