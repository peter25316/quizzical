const getQuestions = async (gameOptions) => {
  const { category, difficulty, type } = gameOptions;

  let categoryQuery = "";
  let difficultyQuery = "";
  let typeQuery = "";

  if (category !== "") categoryQuery = `&category=${category}`;
  if (difficulty !== "") difficultyQuery = `&difficulty=${difficulty}`;
  if (type !== "") typeQuery = `&type=${type}`;

  const url = `https://opentdb.com/api.php?amount=5${categoryQuery}${difficultyQuery}${typeQuery}`;

  const res = await fetch(url);
  const data = await res.json();
  return data.results;
};

export default getQuestions;
