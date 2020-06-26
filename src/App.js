import React, { useState, useRef, useEffect } from 'react';
import { useInterval } from './useInterval';

import GlobalStyle from './styles/global';
import { Container } from './styles';

export default function App() {
  const canvasSize = [1200, 500];
  const snakeStart = [
    [5, 20],
    [4, 20],
  ];
  const appleStart = [28, 8];
  const scale = 20;
  const snakeSpeed = 50;
  const directions = {
    38: [0, -1], // up
    40: [0, 1], // down
    37: [-1, 0], // left
    39: [1, 0], // right
  };

  const canvasRef = useRef();
  const [snake, setSnake] = useState(snakeStart);
  const [apple, setApple] = useState(appleStart);
  const [dir, setDir] = useState([1, 0]);
  const [speed, setSpeed] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [count, setCount] = useState(0);

  useInterval(() => gameLoop(), speed);

  const endGame = () => {
    setSpeed(null);
    setGameOver(true);
  };

  const moveSnake = ({ keyCode }) =>
    keyCode >= 37 && keyCode <= 40 && setDir(directions[keyCode]);

  const createApple = () =>
    apple.map((_a, i) => Math.floor(Math.random() * (canvasSize[i] / scale)));

  const checkCollision = (piece, snk = snake) => {
    if (piece[0] * scale >= canvasSize[0]) {
      piece[0] = 0;
      return false;
    }
    if (piece[0] < 0) {
      piece[0] = canvasSize[0] / scale;
      return false;
    }
    if (piece[1] * scale >= canvasSize[1]) {
      piece[1] = 0;
      return false;
    }
    if (piece[1] * scale < 0) {
      piece[1] = canvasSize[1] / scale;
      return false;
    }

    for (const segment of snk) {
      if (piece[0] === segment[0] && piece[1] === segment[1]) return true;
    }
    return false;
  };

  const checkAppleCollision = (newSnake) => {
    if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
      let newApple = createApple();
      while (checkCollision(newApple, newSnake)) {
        newApple = createApple();
      }
      setApple(newApple);
      setCount(count + 1);
      return true;
    }
    return false;
  };

  const gameLoop = () => {
    const snakeCopy = JSON.parse(JSON.stringify(snake));
    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
    snakeCopy.unshift(newSnakeHead);
    // snakeCopy.pop();
    if (checkCollision(newSnakeHead)) endGame();
    if (!checkAppleCollision(snakeCopy)) snakeCopy.pop();
    setSnake(snakeCopy);
  };

  const startGame = () => {
    setSnake(snakeStart);
    setApple(appleStart);
    setDir([1, 0]);
    // setDir([0, 1]);
    setSpeed(snakeSpeed);
    setGameOver(false);
    setCount(0);
  };

  useEffect(() => {
    const context = canvasRef.current.getContext('2d');
    context.setTransform(scale, 0, 0, scale, 0, 0);
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.fillStyle = '#009A53';
    // snake.forEach(([x, y]) => context.fillRect(x, y, 1 - 0.1, 1 - 0.1));
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
    context.fillStyle = '#D12B2B';
    context.fillRect(apple[0], apple[1], 1, 1);
  }, [snake, apple, gameOver]);

  return (
    <>
      <GlobalStyle />
      <Container>
        <div
          role='button'
          tabIndex='0'
          onKeyDown={(e) => moveSnake(e)}
          // onKeyPress={(e) => startGame(e)}
        >
          <canvas
            ref={canvasRef}
            width={`${canvasSize[0]}px`}
            height={`${canvasSize[1]}px`}
          />
          <br />
          {gameOver && <div className='gameover'>Game Over !</div>}
          <div className='below'>
            <button onClick={startGame}>Start Game</button>

            <div className='title'>
              Snake Game <div className='author'>by JV</div>
            </div>

            <div className='score'>Your score is: {count}</div>
          </div>
        </div>
      </Container>
    </>
  );
}
