import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

export const StudyBody = ({cards, deck}) => {
    const [flipped, setFlipped] = useState(false);
    const [card, setCard] = useState(0);
    const history = useHistory()
    console.log(cards.length)  

    const flipHandler = (e) => {
      e.preventDefault();
        flipped ? setFlipped(false) : setFlipped(true);
    }

//on next click, window pops up confirming restart or navigate home on cancel
    const nextHandler = (e) => {
      e.preventDefault();
        if(card === (cards.length - 1)) {
            window.confirm("Restart Cards?\n\n Click 'Cancel' to return home") ? setCard(() => 0): history.push("/")
    // If not last card, go to next card        
        } else {
            setCard((card) => card +1)
            setFlipped((false))
        }
    }

if (cards.length <=2) {return (
        <div className ="container">
            <h2> Not Enough Cards</h2>
            <p> You need at least 3 cards to study. There are {cards.length} cards in this deck.</p>
            <Link to={`/deck/${deck.id}/cards/new`}><button className="btn btn-primary">Create a Card</button></Link>
        </div>
        )
} else {return (
        <div  className="card">
          <div className="card-body">
            <h5 className="card-title">
              Card {card + 1} of {deck.cards.length}
            </h5>
            <p className="card-text">
                {flipped ? cards[card].back : cards[card].front}
            </p>
            {/* Flip card button */}
            <button className="btn btn-secondary" onClick={flipHandler}>
              Flip
            </button>
            {/* IF card is on backside, provide a button to go to next card*/}
            {flipped ? 
            <button className="btn btn-primary" onClick={nextHandler}>
                Next
            </button> : null}
          </div>
        </div>
)}

}