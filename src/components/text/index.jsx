import clsx from "clsx";

const Text = ({ children, className }) => {
  return <div className={clsx(className)}>{children}</div>;
};

export default Text;
