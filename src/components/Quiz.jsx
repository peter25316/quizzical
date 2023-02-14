import { useState, useEffect } from "react";
import Question from "./Question";
import Button from "./Button";
import getQuestions from "./data/getQuestions";
import "./styles/Quiz.css";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

const Quiz = (props) => {
  const [questionSet, setQuestionSet] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    getQuestions(props.gameOptions).then((questions) => {
      if (questions.length === 0) {
        props.startHandle();
        props.handleNoQuestions(true);
      } else {
        props.handleNoQuestions(false);
      }
      setQuestionSet(
        questions.map((question) => {
          return {
            ...question,
            selectedAnswer: "",
            id: nanoid(),
          };
        })
      );
    });

    return () => {
      controller.abort();
    };
  }, []);

  const handleSelect = (id, selectedAnswer) => {
    if (selectedAnswer) {
      setQuestionSet((questions) =>
        questions.map((question) => {
          return question.id === id
            ? { ...question, selectedAnswer: selectedAnswer.value }
            : question;
        })
      );
    }
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
    questionSet.forEach((question) => {
      if (question.correct_answer === question.selectedAnswer)
        setCorrectCount((prevCount) => prevCount + 1);
    });
  };

  const handleReset = () => {
    props.startHandle();
  };

  const questionsHtml = questionSet.map((question) => (
    <Question
      key={question.id}
      {...question}
      handleSelect={handleSelect}
      showAnswer={showAnswer}
    ></Question>
  ));

  return (
    <>
      {correctCount === 5 && <Confetti className="confetti"></Confetti>}
      <div className="quiz-container">
        {questionsHtml}
        <div className="quiz-inner">
          {showAnswer && <h3>You scored {correctCount}/5 correct answers</h3>}
          <Button
            value={!showAnswer ? "Check answers" : "Play again"}
            handleClick={!showAnswer ? handleShowAnswer : handleReset}
          ></Button>
        </div>
      </div>
    </>
  );
};

export default Quiz;
