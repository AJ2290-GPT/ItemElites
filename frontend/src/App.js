import React, { useState } from 'react';

function App() {
  const [userInput, setUserInput] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!userInput.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('https://itemelites-backend.onrender.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await res.json();
      setResults([data.reply]);
    } catch (error) {
      console.error('Error fetching:', error);
      setResults(['Something went wrong.']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>ItemElites</h1>
      <input
        type="text"
        placeholder="Search for an item..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        style={{ padding: '0.5rem', width: '300px' }}
      />
      <button onClick={handleSearch} style={{ padding: '0.5rem', marginLeft: '10px' }}>
        Search
      </button>

      {loading && <p>Loading...</p>}

      <ul style={{ marginTop: '20px' }}>
        {results.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
