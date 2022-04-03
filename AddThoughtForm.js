// AddThoughtForm.js
import React, {useState} from 'react';
import { generateId, getNewExpirationTime } from './utilities';

export function AddThoughtForm(props) {
  const [text, setText] = useState("")

  const handleTextChange = (e) => {
    setText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newThought = {
      id: generateId(),
      text: text,
      expiresAt: getNewExpirationTime()
    }
    if(text.length > 0) {
      e.preventDefault();
      props.addThought(newThought);
    }
    setText("");
  }

  return (
    <form className="AddThoughtForm" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={handleTextChange}
        aria-label="What's on your mind?"
        placeholder="What's on your mind?"
      />
      <input type="submit" value="Add" />
    </form>
  );
}

// Thought.js
import React, {useEffect} from 'react';

export function Thought(props) {
  const { thought, removeThought } = props;

  const handleRemoveClick = () => {
    removeThought(thought.id);
  };

  useEffect(() => {
    const timeRemaining = thought.expiresAt - Date.now();
    const timeout = setTimeout(() => {
      removeThought(thought.id)
    }, timeRemaining);
    return () => {
      clearTimeout(timeout)
    }
  }, [thought])

  return (
    <li className="Thought">
      <button
        aria-label="Remove thought"
        className="remove-button"
        onClick={handleRemoveClick}
      >
        &times;
      </button>
      <div className="text">{thought.text}</div>
    </li>
  );
}

// App.js
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { AddThoughtForm } from './AddThoughtForm';
import { Thought } from './Thought';
import { generateId, getNewExpirationTime } from './utilities';

function App() {
  const [thoughts, setThoughts] = useState([
    {
      id: generateId(),
      text: 'This is a place for your passing thoughts.',
      expiresAt: getNewExpirationTime(),
    },
    {
      id: generateId(),
      text: "They'll be removed after 15 seconds.",
      expiresAt: getNewExpirationTime(),
    },
  ]);

  const addThought = (thought) => {
    setThoughts((thoughts) => [thought, ...thoughts]);
  }

  const removeThought = (thoughtIdToRemove) => {
    setThoughts((thoughts) => thoughts.filter(thought => thought.id !== thoughtIdToRemove))
  }

  return (
    <div className="App">
      <header>
        <h1>Passing Thoughts</h1>
      </header>
      <main>
        <AddThoughtForm addThought={addThought} />
        <ul className="thoughts">
          {thoughts.map((thought) => (
            <Thought removeThought={removeThought} key={thought.id} thought={thought} />
          ))}
        </ul>
      </main>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));

