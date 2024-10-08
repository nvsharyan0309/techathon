import React, { useState, useEffect, useRef } from 'react';

// Tic Tac Toe Game
const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  const calculateWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i: number) => {
    if (winner || board[i]) return;
    const newBoard = board.slice();
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
    setWinner(calculateWinner(newBoard));
  };

  const renderSquare = (i: number) => (
    <button className="w-16 h-16 border border-gray-400 text-2xl font-bold" onClick={() => handleClick(i)}>
      {board[i]}
    </button>
  );

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  };

  return (
    <div className="text-center">
      <h3 className="text-xl font-bold mb-4">Tic Tac Toe</h3>
      <div className="mb-4">
        {winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`}
      </div>
      <div className="grid grid-cols-3 gap-1 w-52 mx-auto mb-4">
        {board.map((_, i) => renderSquare(i))}
      </div>
      <button onClick={resetGame} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Reset Game
      </button>
    </div>
  );
};

// Snake Game
const Snake = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const scale = 20;
    const rows = canvas.height / scale;
    const columns = canvas.width / scale;

    let snake = [
      { x: 10, y: 10 },
    ];

    let food = {
      x: Math.floor(Math.random() * columns) * scale,
      y: Math.floor(Math.random() * rows) * scale,
    };

    let dx = scale;
    let dy = 0;

    const drawSnake = () => {
      ctx.fillStyle = 'lime';
      snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, scale, scale);
      });
    };

    const drawFood = () => {
      ctx.fillStyle = 'red';
      ctx.fillRect(food.x, food.y, scale, scale);
    };

    const moveSnake = () => {
      const head = { x: snake[0].x + dx, y: snake[0].y + dy };
      snake.unshift(head);

      if (head.x === food.x && head.y === food.y) {
        setScore(prevScore => prevScore + 1);
        food = {
          x: Math.floor(Math.random() * columns) * scale,
          y: Math.floor(Math.random() * rows) * scale,
        };
      } else {
        snake.pop();
      }
    };

    const checkCollision = () => {
      if (
        snake[0].x < 0 ||
        snake[0].x >= canvas.width ||
        snake[0].y < 0 ||
        snake[0].y >= canvas.height ||
        snake.slice(1).some(segment => segment.x === snake[0].x && segment.y === snake[0].y)
      ) {
        setGameOver(true);
      }
    };

    const gameLoop = () => {
      if (gameOver) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawFood();
      moveSnake();
      drawSnake();
      checkCollision();
    };

    const changeDirection = (e: KeyboardEvent) => {
      const LEFT_KEY = 37;
      const RIGHT_KEY = 39;
      const UP_KEY = 38;
      const DOWN_KEY = 40;

      const keyPressed = e.keyCode;
      const goingUp = dy === -scale;
      const goingDown = dy === scale;
      const goingRight = dx === scale;
      const goingLeft = dx === -scale;

      if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -scale;
        dy = 0;
      }
      if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -scale;
      }
      if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = scale;
        dy = 0;
      }
      if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = scale;
      }
    };

    document.addEventListener('keydown', changeDirection);

    const intervalId = setInterval(gameLoop, 100);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('keydown', changeDirection);
    };
  }, [gameOver]);

  const resetGame = () => {
    setGameOver(false);
    setScore(0);
  };

  return (
    <div className="text-center">
      <h3 className="text-xl font-bold mb-4">Snake</h3>
      <p className="mb-2">Score: {score}</p>
      <canvas ref={canvasRef} width={400} height={400} className="border border-gray-400 mx-auto" />
      {gameOver && (
        <div className="mt-4">
          <p className="text-red-500 font-bold mb-2">Game Over!</p>
          <button onClick={resetGame} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

// Tetris Game
const Tetris = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const scale = 20;
    const rows = canvas.height / scale;
    const columns = canvas.width / scale;

    let board = Array(rows).fill(null).map(() => Array(columns).fill(0));

    const pieces = [
      [
        [1, 1, 1, 1]
      ],
      [
        [1, 1],
        [1, 1]
      ],
      [
        [0, 1, 1],
        [1, 1, 0]
      ],
      [
        [1, 1, 0],
        [0, 1, 1]
      ],
      [
        [1, 1, 1],
        [0, 1, 0]
      ],
      [
        [1, 1, 1],
        [1, 0, 0]
      ],
      [
        [1, 1, 1],
        [0, 0, 1]
      ]
    ];

    let currentPiece = {
      x: Math.floor(columns / 2) - 1,
      y: 0,
      shape: pieces[Math.floor(Math.random() * pieces.length)]
    };

    const drawBoard = () => {
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
          if (board[y][x]) {
            ctx.fillStyle = 'blue';
            ctx.fillRect(x * scale, y * scale, scale, scale);
          }
        }
      }
    };

    const drawPiece = () => {
      ctx.fillStyle = 'red';
      currentPiece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value) {
            ctx.fillRect((currentPiece.x + x) * scale, (currentPiece.y + y) * scale, scale, scale);
          }
        });
      });
    };

    const collision = (x: number, y: number, piece: number[][]) => {
      for (let row = 0; row < piece.length; row++) {
        for (let col = 0; col < piece[row].length; col++) {
          if (piece[row][col] && (board[y + row] && board[y + row][x + col]) !== 0) {
            return true;
          }
        }
      }
      return false;
    };

    const merge = () => {
      currentPiece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value) {
            board[currentPiece.y + y][currentPiece.x + x] = value;
          }
        });
      });
    };

    const rotate = (piece: number[][]) => {
      const newPiece = piece[0].map((_, index) =>
        piece.map(row => row[index])
      );
      return newPiece.map(row => row.reverse());
    };

    const moveDown = () => {
      if (!collision(currentPiece.x, currentPiece.y + 1, currentPiece.shape)) {
        currentPiece.y++;
      } else {
        merge();
        currentPiece = {
          x: Math.floor(columns / 2) - 1,
          y: 0,
          shape: pieces[Math.floor(Math.random() * pieces.length)]
        };
        if (collision(currentPiece.x, currentPiece.y, currentPiece.shape)) {
          setGameOver(true);
        }
      }
    };

    const moveLeft = () => {
      if (!collision(currentPiece.x - 1, currentPiece.y, currentPiece.shape)) {
        currentPiece.x--;
      }
    };

    const moveRight = () => {
      if (!collision(currentPiece.x + 1, currentPiece.y, currentPiece.shape)) {
        currentPiece.x++;
      }
    };

    const rotatePiece = () => {
      const rotated = rotate(currentPiece.shape);
      if (!collision(currentPiece.x, currentPiece.y, rotated)) {
        currentPiece.shape = rotated;
      }
    };

    const clearLines = () => {
      let linesCleared = 0;
      for (let y = rows - 1; y >= 0; y--) {
        if (board[y].every(value => value !== 0)) {
          board.splice(y, 1);
          board.unshift(Array(columns).fill(0));
          linesCleared++;
        }
      }
      if (linesCleared > 0) {
        setScore(prevScore => prevScore + linesCleared * 100);
      }
    };

    const gameLoop = () => {
      if (gameOver) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBoard();
      drawPiece();
      moveDown();
      clearLines();
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver) return;

      if (e.keyCode === 37) moveLeft();
      if (e.keyCode === 39) moveRight();
      if (e.keyCode === 40) moveDown();
      if (e.keyCode === 38) rotatePiece();
    };

    document.addEventListener('keydown', handleKeyPress);

    const intervalId = setInterval(gameLoop, 500);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [gameOver]);

  const resetGame = () => {
    setGameOver(false);
    setScore(0);
  };

  return (
    <div className="text-center">
      <h3 className="text-xl font-bold mb-4">Tetris</h3>
      <p className="mb-2">Score: {score}</p>
      <canvas ref={canvasRef} width={200} height={400} className="border border-gray-400 mx-auto" />
      {gameOver && (
        <div className="mt-4">
          <p className="text-red-500 font-bold mb-2">Game Over!</p>
          <button onClick={resetGame} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

// Pong Game
const Pong = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState({ player: 0, computer: 0 });
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const paddleWidth = 10;
    const paddleHeight = 100;
    const ballSize = 10;

    let playerY = (canvas.height - paddleHeight) / 2;
    let computerY = (canvas.height - paddleHeight) / 2;
    let ballX = canvas.width / 2;
    let ballY = canvas.height / 2;
    let ballSpeedX = 5;
    let ballSpeedY = 5;

    const drawRect = (x: number, y: number, width: number, height: number, color: string) => {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, width, height);
    };

    const drawCircle = (x: number, y: number, radius: number, color: string) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2, false);
      ctx.closePath();
      ctx.fill();
    };

    const drawNet = () => {
      for (let i = 0; i <= canvas.height; i += 40) {
        drawRect(canvas.width / 2 - 1, i, 2, 20, 'white');
      }
    };

    const draw = () => {
      // Clear canvas
      drawRect(0, 0, canvas.width, canvas.height, 'black');

      // Draw net
      drawNet();

      // Draw paddles
      drawRect(0, playerY, paddleWidth, paddleHeight, 'white');
      drawRect(canvas.width - paddleWidth, computerY, paddleWidth, paddleHeight, 'white');

      // Draw ball
      drawCircle(ballX, ballY, ballSize, 'white');

      // Draw scores
      ctx.fillStyle = 'white';
      ctx.font = '30px Arial';
      ctx.fillText(score.player.toString(), canvas.width / 4, 50);
      ctx.fillText(score.computer.toString(), 3 * canvas.width / 4, 50);
    };

    const update = () => {
      // Move the ball
      ballX += ballSpeedX;
      ballY += ballSpeedY;

      // Ball collision with top and bottom walls
      if (ballY - ballSize < 0 || ballY + ballSize > canvas.height) {
        ballSpeedY = -ballSpeedY;
      }

      // Ball collision with paddles
      if (
        (ballX - ballSize < paddleWidth && ballY > playerY && ballY < playerY + paddleHeight) ||
        (ballX + ballSize > canvas.width - paddleWidth && ballY > computerY && ballY < computerY + paddleHeight)
      ) {
        ballSpeedX = -ballSpeedX;
      }

      // Computer paddle movement
      const computerCenter = computerY + paddleHeight / 2;
      if (computerCenter < ballY - 35) {
        computerY += 6;
      } else if (computerCenter > ballY + 35) {
        computerY -= 6;
      }

      // Score points
      if (ballX - ballSize < 0) {
        setScore(prevScore => ({ ...prevScore, computer: prevScore.computer + 1 }));
        resetBall();
      } else if (ballX + ballSize > canvas.width) {
        setScore(prevScore => ({ ...prevScore, player: prevScore.player + 1 }));
        resetBall();
      }

      // Check for game over
      if (score.player >= 5 || score.computer >= 5) {
        setGameOver(true);
      }
    };

    const resetBall = () => {
      ballX = canvas.width / 2;
      ballY = canvas.height / 2;
      ballSpeedX = -ballSpeedX;
      ballSpeedY = Math.random() > 0.5 ? 5 : -5;
    };

    const gameLoop = () => {
      update();
      draw();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      playerY = e.clientY - rect.top - paddleHeight / 2;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    const intervalId = setInterval(gameLoop, 1000 / 60); // 60 FPS

    return () => {
      clearInterval(intervalId);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [score, gameOver]);

  const resetGame = () => {
    setGameOver(false);
    setScore({ player: 0, computer: 0 });
  };

  return (
    <div className="text-center">
      <h3 className="text-xl font-bold mb-4">Pong</h3>
      <canvas ref={canvasRef} width={800} height={400} className="border border-gray-400 mx-auto" />
      {gameOver && (
        <div className="mt-4">
          <p className="text-red-500 font-bold mb-2">
            Game Over! {score.player > score.computer ? 'You win!' : 'Computer wins!'}
          </p>
          <button onClick={resetGame} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

const Games: React.FC = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  const renderGame = () => {
    switch (activeGame) {
      case 'tictactoe':
        return <TicTacToe />;
      case 'snake':
        return <Snake />;
      case 'tetris':
        return <Tetris />;
      case 'pong':
        return <Pong />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Games</h2>
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveGame('tictactoe')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Tic Tac Toe
        </button>
        <button
          onClick={() => setActiveGame('snake')}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Snake
        </button>
        <button
          onClick={() => setActiveGame('tetris')}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Tetris
        </button>
        <button
          onClick={() => setActiveGame('pong')}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          Pong
        </button>
      </div>
      {renderGame()}
    </div>
  );
};

export default Games;
