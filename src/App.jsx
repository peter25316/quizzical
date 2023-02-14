import { useState } from "react";
import Landing from "./components/Landing";
import Quiz from "./components/Quiz";

const App = () => {
  const [start, setStart] = useState(false);
  const [noQuestionsErr, setNoQuestionErr] = useState(false);
  const [gameOptions, setGameOptions] = useState({
    category: "",
    difficulty: "",
    type: "",
  });

  const startHandle = () => {
    setStart((prevStart) => !prevStart);
  };

  const handleNoQuestions = (boolean) => {
    setNoQuestionErr(boolean);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGameOptions((prevOptions) => {
      return {
        ...prevOptions,
        [name]: value,
      };
    });
  };

  return (
    <main className="app">
      <img className="blob1" src="blob1.png" alt="" />
      <img className="blob2" src="blob2.png" alt="" />
      {start ? (
        <Quiz
          startHandle={startHandle}
          handleNoQuestions={handleNoQuestions}
          gameOptions={gameOptions}
        ></Quiz>
      ) : (
        <Landing
          startHandle={startHandle}
          handleChange={handleChange}
          noQuestionsErr={noQuestionsErr}
          gameOptions={gameOptions}
        ></Landing>
      )}
    </main>
  );
};

export default App;
