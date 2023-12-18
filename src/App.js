import './App.css';
import StartScreen from './components/StartScreen';

// React
import { useCallback, useEffect, useState } from 'react';

//data
import { wordsList } from './data/words';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"},
];

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [picketWord, setPicketWorld] = useState("");

  const [picketCategory, setPicketCategory] = useState("");

  const [letters, setLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = useCallback(() => {

      //pegando uma categoria aleatória
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];
      //pegando uma palavra aleatória da categoria
    const word = words[category][Math.floor(Math.random() * words[category].length)];
    return {word, category};
  }, [words]);


  const startGame = useCallback(() => {

    clearLetterStates();

    const { word, category } = pickWordAndCategory();

    //criar um array com as letras
    let wordLetters = word.split("");

    wordLetters = wordLetters.map((l) => l.toLowerCase());

    setPicketWorld(word);
    setPicketCategory(category);
    setLetters(wordLetters)
    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

  const verifyLetter = (letter) => {
      const normalizedLetter = letter.toLowerCase()

      if(
        guessedLetters.includes(normalizedLetter) || 
        wrongLetters.includes(normalizedLetter)
      ) {
        return;
      }

      if(letters.includes(normalizedLetter)) {
        setGuessedLetters((actualGuessedLetters) => [
          ...actualGuessedLetters,
          normalizedLetter,
        ]);
      } else {
        setWrongLetters((actualWrongLetters) => [
          ...actualWrongLetters,
          normalizedLetter,
        ]);

        setGuesses((actualGesses) => actualGesses-1);
      }
  };

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }

  const retry = () => {

    setScore(0);
    setGuesses(3);

    setGameStage(stages[0].name);
  }

  useEffect(() => {
    if(guesses <= 0) {
      clearLetterStates();
      setGameStage(stages[2].name);
    }
  }, [guesses]);

  useEffect(() => {
    const uniqueLetters = [... new Set(letters)];

    if(guessedLetters.length === uniqueLetters.length) {
      setScore((actualScore) => actualScore += 100);

      startGame();
    }
  }, [guessedLetters, letters, startGame]);

  return (
    <div className="App">

      {gameStage === "start" && <StartScreen startGame={startGame} /> }
      {gameStage === "game" && <Game verifyLetter={verifyLetter} 
      pickedWord={picketWord} picketCategory={picketCategory}
      letters={letters} guessedLetters={guessedLetters}
      wrongLetters={wrongLetters} guesses={guesses}
      score={score} />}
      {gameStage === "end" && <GameOver retry={retry} score={score} />}

    </div>
  );
}

export default App;
