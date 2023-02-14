import "./styles/Question.css";
import { useState, useEffect } from "react";
import { decode } from "html-entities";
import { nanoid } from "nanoid";
import Answer from "./Answer";

const Question = (props) => {
  const [answers, setAnswers] = useState(generateAnswers());

  useEffect(() => {
    const selectedAnswer = answers.filter((answer) => {
      return answer.isSelected;
    })[0];
    props.handleSelect(props.id, selectedAnswer);
  }, [answers]);

  function generateAnswer(value, isCorrect) {
    return {
      value: value,
      isSelected: false,
      isCorrect: isCorrect,
      id: nanoid(),
    };
  }

  function generateAnswers() {
    const newAnswers = props.incorrect_answers.map((answer) =>
      generateAnswer(answer, false)
    );
    newAnswers.push(generateAnswer(props.correct_answer, true));
    newAnswers.sort((a, b) => a.value.localeCompare(b.value));
    return newAnswers;
  }

  const handleSelect = (id) => {
    setAnswers((prevAnswers) =>
      prevAnswers.map((answer) => {
        return answer.id === id
          ? { ...answer, isSelected: !answer.isSelected }
          : { ...answer, isSelected: false };
      })
    );
  };

  const answersHtml = answers.map((answer) => {
    return (
      <Answer
        key={answer.id}
        {...answer}
        showAnswer={props.showAnswer}
        handleSelect={() => handleSelect(answer.id)}
      ></Answer>
    );
  });

  return (
    <div className="question-container">
      <h3 className="question">{decode(props.question)}</h3>
      <div className="answers-container">{answersHtml}</div>
    </div>
  );
};

export default Question;
