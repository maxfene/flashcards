import React from "react";
import { Link } from "react-router-dom";
import { deleteDeck } from "../utils/api/index.js";

export default function DeckList({ decks }) {

//on delete click, window prompting 'are you sure?'
//deletes deck and reloads when user proceeds
  async function handleDelete(id) {
    const abortCon = new AbortController();
    try {
      const result = window.confirm(
        "Delete this deck?\n\n\nYou will not be able to recover it."
      );
      if (result) {
        await deleteDeck(id, abortCon.signal);
        window.location.reload();
      }
    } catch (err) {throw err}
    return () => abortCon.abort();
  }

//returns list of decks from API in card form with options to view, study, or delete
  return (
    <div>
      {decks.map((deck) => (
        <div className="card " key={deck.id}>
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <div className="flex-item">
                <h2 className="card-title">{deck.name}</h2>
              </div>
              <div className="flex-item">
                <p className="text-muted">
                  <small>{deck.cards.length} cards</small>
                </p>
              </div>
            </div>
            <p className="card-text">{deck.description}</p>
            <div className="d-flex justify-content-between">
              <div className="">
                <Link
                  className="btn btn-secondary mr-2"
                  to={`decks/${deck.id}`}
                >
                  <i className="fa-solid fa-eye mr-1"></i> View
                </Link>
                <Link
                  className="btn btn-primary  mr-2"
                  to={`/decks/${deck.id}/study`}
                >
                  <i className="fa-solid fa-book mr-1"></i> Study
                </Link>
              </div>
              <div className="">
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => handleDelete(deck.id)}
                > Delete
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}