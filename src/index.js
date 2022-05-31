import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import cardBack from './cardBack.jpg';
import banner from './banner.jpg';
import four from './four.png';
import Jack from './Jack.png';
import Joker from './Joker.jpg';
import King from './King.png';
import Queen from './Queen.png';
import suits from './suits.jpg';
import ten from './ten.png';
import circle from './circle.png';

class Square extends React.Component {
    render() {
        return (
            <button className="square"
               onClick = {() => this.props.onClick()}>
              {images[this.props.value]}
            </button>
        );
  }
}

let initialFlip = [];
for(let i=0; i < 16; i++) {
    initialFlip[i] = false;
}
  
class Board extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            numberOfClicks: 0,
            numberOfFound: 0,
            previousClick2: null,
            previousClick: null,
            numbers: randImages(),
            isFliped: initialFlip,
            winner: null
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(i) {
        this.setState({numberOfClicks: (this.state.numberOfClicks+1)});
        if(this.state.previousClick2 === null) {
            initialFlip[i]=true;
            this.setState({isFliped: initialFlip,
                        previousClick: i});
        } else {
            initialFlip[i]=true;
            if(!(this.state.numbers[this.state.previousClick2] ===
                this.state.numbers[i])) {
            initialFlip[this.state.previousClick2]=false;
            this.setState({isFliped: initialFlip,
                        previousClick: i,
                        previousClick2: null});
            } else {
                this.setState({numberOfFound: (this.state.numberOfFound+1)});
                initialFlip[i]=true;
                this.setState({isFliped: initialFlip,
                            previousClick: null,
                            previousClick2: null})
            }
        }
    }

    handleClcikToInitialState(i) {
        this.setState({numberOfClicks: (this.state.numberOfClicks+1)});
        initialFlip[i]=true;

        if (!(this.state.numbers[this.state.previousClick] ===
            this.state.numbers[i])) {
            initialFlip[this.state.previousClick]=false;
            this.setState({isFliped: initialFlip,
                previousClick: null,
                previousClick2: i});
        }
        else {
            this.setState({numberOfFound: (this.state.numberOfFound+1)});
            initialFlip[i]=true;
            this.setState({isFliped: initialFlip,
                            previousClick: null,
                            previousClick2: null})
        }
    }

    renderSquare(i) {
        let value;
        if(!this.state.isFliped[i]) {
            value=0;
        }
        else {
            value=this.state.numbers[i];
        }
      return ( <Square 
        onClick={() => {
            if(this.state.previousClick == null) {
                this.handleClick(i);
            } 
            else {
                this.handleClcikToInitialState(i);
            } 
          }
        }
        value={value}
      /> );
    }
  
    render() {
        let grid = [];

        for (let i=0; i <= 3; i++) {
            let gridrow = [];
            for (let j = (4*i); j <= (3+4*i); j++) {
                gridrow.push(this.renderSquare(j));
            }

            grid.push(<div className="board-row">
                        {gridrow}
                    </div>);
        }
            
        return (<div>
                <div classname="grid">
                    {grid}
                </div>
                <div className="statistics">
                    <p1>
                        The number of clicks: {this.state.numberOfClicks}
                    <br></br>
                        The number of pairs found: {this.state.numberOfFound}
                    <br></br>
                        There are {8-this.state.numberOfFound} pairs 
                        that still need to be found!
                    </p1>
                </div>
            </div>);

    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
            </div>
        )
    }
}

const images = {
    9: <img src={circle} alt="clear"
    width="100" height="140"/>, 
    0: <img src={cardBack} alt="back of a card"
    width="100" height="140"/>,
    1: <img src={banner} alt="back of a card"
    width="100" height="140"/>,
    2: <img src={four} alt="back of a card"
    width="100" height="140"/>,
    3: <img src={Jack} alt="back of a card"
    width="100" height="130"/>,
    4: <img src={Joker} alt="back of a card"
    width="100" height="140"/>,
    5: <img src={King} alt="back of a card"
    width="95" height="140"/>,
    6: <img src={Queen} alt="back of a card"
    width="100" height="140"/>,
    7: <img src={suits} alt="back of a card"
    width="100" height="140"/>,
    8: <img src={ten} alt="back of a card"
    width="95" height="140"/>
}


function randImages() {
    let numbers = [];
    for (let i = 0; i < 8; i++) {
        numbers[i] = i + 1;
    }
    for (let i =8; i < 16; i++) {
        numbers[i] = i - 7;
    }

    function shuffleArray (array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }

        return array;
    }

    numbers = shuffleArray(numbers);

    return numbers;
}

/*function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}*/

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
