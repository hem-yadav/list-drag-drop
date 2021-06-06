import "../style/icon.css";

export const Icon = ({ classes = {}, icon, onClick, ...props }) => {
  const clickListener = () => onClick?.();

  return (
    <span
      className={`display-flex flex-center ${classes.wrapper}`}
      onClick={clickListener}
    >
      <i className={`icon fas ${icon}`} {...props}></i>
    </span>
  );
};
