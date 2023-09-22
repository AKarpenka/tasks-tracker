import './Button.scss';

// eslint-disable-next-line react/prop-types
const Button = ({ value, colorMode, onClickBtn }) => {
  return (
    <input
      type="button"
      value={value}
      className={colorMode === 'ok' ? 'ok' : 'danger'}
      onClick={onClickBtn}
    />
  );
};

export default Button;
