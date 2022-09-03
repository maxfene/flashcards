import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import NavBar from "../Layout/NavBar";
import { readDeck } from "../utils/api";
import { StudyBody } from "./StudyBody";


export default function Study() {

    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);
    const {deckId} = useParams();
    console.log(deckId);

    useEffect (() => {
    const abortCon = new AbortController();
    async function getDeck() {
      try {
        if (deckId) {
          const response = await readDeck(deckId, abortCon.signal);
          setDeck({ ...response });
          setCards([...response.cards]);
        }
      } catch (err) {throw err}
    }
    getDeck();
    return () => abortCon.abort();
  }, [deckId])

    // console.log(cards);

    return (
    <>
     <NavBar linkName={deck.name}
           link={`/decks/${deck.id}`}
           pageName={"Study"} />
     <h1>Study: {deck.name}</h1>
     <StudyBody cards = {cards} deck = {deck}/>
    </>
)
}