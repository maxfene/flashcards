import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createDeck, readDeck, updateDeck } from "../utils/api";

export default function DeckForm({ mode }) {
  const history = useHistory();
  const { deckId } = useParams();

//create format for editing or creating decks & updating state accordingly
  const initialFormData = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState({ ...initialFormData });

  const handleChange = ({ target }) =>
    setFormData({ ...formData, [target.name]: target.value });


//retrieves deck being edited 
  useEffect(() => {
    const abortCon = new AbortController();

    async function getEditDeck() {
      try {
        const deckToEdit = await readDeck(deckId, abortCon.signal);
        setFormData({ ...deckToEdit });
      } catch (err) {throw err}
    }
    if (mode === "edit") {
      getEditDeck();
    }
    return () => abortCon.abort();
  }, [deckId, mode]);


//handles submit depending on use for create or for edit
  const handleSubmit = (event) => {
    event.preventDefault();
    const abortCon = new AbortController();
    async function createNewDeck() {
      try {
        const newDeck = await createDeck(formData, abortCon.signal);
        setFormData({ ...initialFormData });
        history.push(`/decks/${newDeck.id}`);
      } catch (err) {throw err}
    }
    async function editDeck() {
      try {
        await updateDeck(formData, abortCon.signal);
        history.push(`/decks/${deckId}`);
      } catch (err) {throw err}
    }
    mode === "create" ? createNewDeck() : editDeck();
    return () => abortCon.abort();
  };

//if form is in edit mode, text values should be displayed for edit
//cancel button should redirect to last page depending on edit or create mode
  return (
    <div className="d-flex flex-column">
      <form className="col-12" onSubmit={handleSubmit}>
        <div className="row form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control form-control-lg"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Deck Name"
            required = "true"
          />
        </div>
        <div className="row form-group">
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            className="form-control form-control-lg"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Brief description of the deck"
            required = "true"
          />
        </div>
        <div className="row">
          <Link
            to={mode === "create" ? "/" : `/decks/${deckId}`}
            className="btn btn-secondary mr-2"
          >
            Cancel
          </Link>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
