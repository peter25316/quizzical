import "./styles/Answer.css";
import { decode } from "html-entities";

const Answer = (props) => {
  let answerClassName = "answer ";
  let style = "";
  if (!props.showAnswer) {
    style = props.isSelected ? "selected" : "not-selected";
  } else {
    if (props.isCorrect) style = "correct";
    else if (!props.isCorrect && props.isSelected) style = "incorrect";
    else style = "not-selected-2";
  }

  return (
    <button
      className={answerClassName + style}
      onClick={!props.showAnswer ? props.handleSelect : undefined}
    >
      {decode(props.value)}
    </button>
  );
};

export default Answer;
