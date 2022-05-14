import PropTypes from "prop-types";
import classNames from "classnames";

const Button = ({
  onClick,
  className,
  disabled,
  fullWidth,
  active,
  children,
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classNames("button", className, {
        "full-width": fullWidth,
        "button-disabled": disabled,
        active: active,
      })}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
};

export default Button;
