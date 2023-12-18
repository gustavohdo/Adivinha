//CSS
import "./StartScreen.css";

const StartScreen = ({startGame}) => {
  return (
    <div className="start">
        <h1>Adivinha Só!</h1>
        <p>Qual é a palavra escondida?</p>
        <p>Clique no botão abaixo para começar o jogo!</p>
        <button onClick={startGame}>PLAY</button>
    </div>
  )
}

export default StartScreen