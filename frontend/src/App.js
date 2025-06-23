import React, { useState } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const res = await fetch(https://itemelites-backend.onrender.com, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });

    const data = await res.json();
    setResults(data.results);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>ItemElites</h2>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for an item..."
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {results.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </div>
  );
}

export default App;
