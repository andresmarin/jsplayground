import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

//Pure component: no state, then no class needed
//no this.props, just props
function Square(props) {
  return (
    <button
      className={`square ${props.active ? "active" : ""} ${
        props.winner ? "winner" : ""
      }`}
      id={props.id}
      onClick={props.onSquareClicked}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    let active = this.props.move === i;
    let winner = this.props.winner.includes(i);
    console.log(i + " " + winner);
    return (
      <Square
        active={active}
        winner={winner}
        value={this.props.squares[i]}
        id={i}
        onSquareClicked={() => this.props.onClick(i)}
      />
    );
  }

  renderRow(i) {
    return (
      <div className="board-row" key={i}>
        {this.renderSquare(i)}
        {this.renderSquare(i + 1)}
        {this.renderSquare(i + 2)}
      </div>
    );
  }

  renderBoard() {
    let board = [];
    for (let row = 0; row < 9; row = row + 3) {
      board.push(this.renderRow(row));
    }
    return board;
  }

  render() {
    return <div>{this.renderBoard()}</div>;
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          move: null
        }
      ],
      xIsNext: true,
      stepNumber: 0,
      columns: [],
      rows: []
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const columns = [...this.state.columns, findColumn(i)];
    const rows = [...this.state.rows, findRow(i)];

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          move: i
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      columns,
      rows
    });
  }

  jumpto(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move
        ? "Go to move " +
          move +
          ". Pos (" +
          this.state.columns[move - 1] +
          "," +
          this.state.rows[move - 1] +
          ")"
        : "Go to start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpto(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner.winner;
    } else if (this.state.stepNumber > 8) {
      status = "Is a draw. Try again.";
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
            move={current.move}
            winner={winner ? winner.line : []}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
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

  /* My implementation. This is more expensive as have to go over the entire array befor returning
  let won = null;
   lines.forEach(line => {
    //console.log(line[0] +" - " +squares[line[0]])
    if (
      squares[line[0]] && squares[line[0]] === squares[line[1]] && squares[line[0]] === squares[line[2]]
    ) {
      won = squares[line[0]];
    }
  });
  if (won) return won;
  else return null; */

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        line: lines[i]
      };
    }
  }
  return null;
}

function findColumn(i) {
  let col = 1;
  if (i % 3 > 0) {
    col = i % 3 === 2 ? 3 : 2;
  }
  return col;
}

function findRow(i) {
  let row = 1;
  if (i >= 5) {
    row = 3;
  } else if (i > 2) {
    row = 2;
  }
  return row;
}

ReactDOM.render(<Game />, document.getElementById("root"));
