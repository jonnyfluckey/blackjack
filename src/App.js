import React, { useState, useEffect } from "react";
import shuffle from "fast-shuffle";
import { Button } from "semantic-ui-react";

const style = {
  background: {
    position: "absolute",
    backgroundPosition: "center",
    height: "100%",
    width: "100%",
    backgroundImage: `url(
      https://images.unsplash.com/photo-1515334651527-87d92cb011ec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80
    )`,
    color: "white",
    textAlign: "center"
  },
  card: {
    display: "inline-block",
    border: "solid black",
    width: "100px",
    height: "150px",
    backgroundColor: "white",
    color: "black",
    fontSize: "large"
  }
};

function App() {
  const [deck, setDeck] = useState([]);
  const [shuffledDeck, setShuffledDeck] = useState([]);
  const [playerOne, setPlayerOne] = useState([]);
  const [dealer, SetDealer] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [message, setMessage] = useState("");
  const [suits] = useState(["♣", "♦", "♥", "♠"]);
  const [values] = useState([
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K"
  ]);

  useEffect(() => {
    createDeck();
  }, []);

  function createDeck() {
    const createDeck = [];
    for (let i = 0; i < suits.length; i++) {
      for (let x = 0; x < values.length; x++) {
        let weight = 0;
        if (values[x] === "J" || values[x] === "Q" || values[x] === "K") {
          weight = 10;
        } else if (values[x] === "A") {
          weight = 11;
        } else {
          weight = parseInt(values[x]);
        }

        let card = { value: values[x], suit: suits[i], weight: weight };
        createDeck.push(card);
      }
    }

    setDeck(createDeck);
  }

  function shuffleDeck() {
    const newShuffle = shuffle(deck);
    setShuffledDeck(newShuffle);
  }

  function dealCards() {
    const array = [...shuffledDeck];
    setPlayerOne([array[0], array[2]]);
    SetDealer([array[1], array[3]]);
    array.splice(0, 4);
    setShuffledDeck(array);
  }

  function hitMe() {
    const array = [...shuffledDeck];
    const newCard = array.splice(0, 1);
    playerOne.push(newCard[0]);
    setShuffledDeck(array);
    playGame();
  }
  function hitMeDealer() {
    const array = [...shuffledDeck];
    const newCard = array.splice(0, 1);
    dealer.push(newCard[0]);
    setShuffledDeck(array);
    stay();
  }

  function clearGame() {
    setTimeout(() => setPlayerScore(0), 5000);
    setTimeout(() => setPlayerOne([]), 5000);
    setTimeout(() => SetDealer([]), 5000);
    setTimeout(() => shuffleDeck(), 5000);
  }

  function stay() {
    let dealerWeight = 0;
    let playerWeight = playerScore;
    debugger;
    for (let x = 0; x < dealer.length; x++) {
      dealerWeight += dealer[x].weight;
    }

    if (dealerWeight < playerWeight && dealerWeight < 17) {
      hitMeDealer();
    }

    if (dealerWeight === playerScore) {
      setMessage("Push, try again");
      clearGame();
      return;
    }

    if (dealerWeight > playerScore) {
      setMessage("Dealer Wins, try again");
      clearGame();
      return;
    }
    if (dealerWeight < playerScore) {
      setMessage("You Win!");
      clearGame();
      return;
    }
  }

  function playGame() {
    let playerWeight = 0;
    for (let x = 0; x < playerOne.length; x++) {
      playerWeight += playerOne[x].weight;
    }
    if (playerWeight === 21) {
      setMessage("Blackjack! You Win");
      clearGame();
    }
    if (playerWeight < 21) {
      setMessage(
        `Your current value is ${playerWeight}, do you want to hit or stay?`
      );
      setPlayerScore(playerWeight);
    }
    if (playerWeight > 21) {
      setMessage("You busted out, womp womp");
      clearGame();
    }
  }

  return (
    <div style={style.background}>
      <div>
        <h1 style={{ backgroundColor: "black" }}>Blackjack</h1>
        <Button onClick={() => shuffleDeck()}>Shuffle the Deck</Button>
        <br></br>
        <br></br>
        <Button onClick={() => dealCards()}>Deal the Cards</Button>
        <br></br>
        <br></br>
        <Button onClick={() => playGame()}>Start Game</Button>

        <br></br>
        <p>{message}</p>
        <br></br>
        <h1>Player One:</h1>
        {playerOne.map((card, index) => {
          return (
            <div key={index} style={style.card}>
              <p>{card.value}</p>
              <br></br>
              <br></br>
              <p>{card.suit}</p>
            </div>
          );
        })}
        <h1>Dealer:</h1>
        {dealer.map((card, index) => {
          return (
            <div key={index} style={style.card}>
              <p>{card.value}</p>
              <br></br>
              <br></br>
              <p>{card.suit}</p>
            </div>
          );
        })}
        <br></br>
        <br></br>
        {playerScore !== 0 && (
          <>
            <Button onClick={() => hitMe()}>Hit Me!</Button>
            <Button onClick={() => stay()}>Stay</Button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
