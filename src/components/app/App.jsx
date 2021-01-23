import React, {Fragment} from 'react';
import Board from '../board/Board';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  restart() {
    this.setState(
      {
        history: [
          {
            squares: Array(9).fill(null)
          }
        ],
        stepNumber: 0,
        xIsNext: true
      }
    );
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
    console.log(this.state.history);
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Game Start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner + "!";
    } else if (moves.length >= 10 && !this.calculateWinner(current.squares)) {
      status = "Draw!"
    }
    else {
      status = "Next Player: " + (this.state.xIsNext ? "X" : "O");
      console.log(moves);
    }

    return (
      <Fragment>
        <div className="backdrops">
          <div className="X" id="x1">X</div>
          <div className="X" id="x2">X</div>
          <div className="X" id="x3">X</div>
          <div className="O" id="o1">O</div>
          <div className="O" id="o2">O</div>
        </div>
        <div className="game">
          <div className="game-info">
            <p>History</p>
            <ol>{moves}</ol>
          </div>

          <div className="game-board">
            <div onClick={() => this.restart()} id="restart">
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>
              </button>
              <p>Restart</p>
            </div>
            <p className="player-turn">{status}</p>
            <Board
              squares={current.squares}
              onClick={i => this.handleClick(i)}
              next={this.state.xIsNext ? "X" : "O"}
          />
          </div>        
        </div>
      </Fragment>
    );
  }
}

export default App;
