import Button from "./Button";
import "./styles/Landing.css";
import categories from "./data/categories";
import difficulties from "./data/difficulties";
import quizType from "./data/quizType";
import { nanoid } from "nanoid";

const Landing = (props) => {
  const categoriesHtml = categories.map((category) => (
    <option key={nanoid()} value={category.value}>
      {category.name}
    </option>
  ));

  const difficultiesHtml = difficulties.map((difficulty) => (
    <option key={nanoid()} value={difficulty.value}>
      {difficulty.name}
    </option>
  ));

  const typeHtml = quizType.map((type) => (
    <option key={nanoid()} value={type.value}>
      {type.name}
    </option>
  ));

  return (
    <div className="landing-container">
      <h1 className="landing-title">Quizzical</h1>
      <p className="description">Test your knowledge!</p>
      {props.noQuestionsErr && (
        <h2 className="err">
          Oops! We couldn't find any questions with these options!
        </h2>
      )}
      <form className="form" action="">
        <label className="form-label" htmlFor="category">
          Category:
        </label>
        <select
          name="category"
          value={props.gameOptions.category}
          id="category"
          onChange={props.handleChange}
        >
          <option value="">-- Choose a category --</option>
          {categoriesHtml}
        </select>
        <label className="form-label" htmlFor="difficulty">
          Difficulty:
        </label>
        <select
          name="difficulty"
          value={props.gameOptions.difficulty}
          id="difficulty"
          onChange={props.handleChange}
        >
          <option value="">-- Choose difficulty --</option>
          {difficultiesHtml}
        </select>
        <label className="form-label" htmlFor="type">
          Question Type:
        </label>
        <select
          name="type"
          value={props.gameOptions.type}
          id="type"
          onChange={props.handleChange}
        >
          <option value="">-- Choose question type --</option>
          {typeHtml}
        </select>
      </form>
      <Button handleClick={props.startHandle} value="Start quiz"></Button>
    </div>
  );
};

export default Landing;
