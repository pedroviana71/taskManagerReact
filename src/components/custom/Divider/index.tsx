interface Props {
  className: string;
}

const Divider = ({ className }: Props) => {
  return <hr className={className} />;
};

export default Divider;
