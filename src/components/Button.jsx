import "./styles/Button.css";

const Button = (props) => {
  return (
    <button onClick={props.handleClick} className="btn" type="">
      {props.value}
    </button>
  );
};

export default Button;
