import React, { useState } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSearch() {
    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const res = await fetch('https://itemelites-backend.onrender.com/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });

      if (!res.ok) {
        throw new Error('Server error');
      }

      const data = await res.json();

      setResults(data.results || []); // assuming backend sends { results: [...] }
    } catch (err) {
      setError('Failed to get results. Try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>ItemElites Search</h1>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search items..."
        style={{ padding: '8px', width: '300px' }}
      />
      <button
        onClick={handleSearch}
        disabled={loading || !query.trim()}
        style={{ marginLeft: '10px', padding: '8px 16px' }}
      >
        {loading ? 'Searching...' : 'Search'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {results.map((item, i) => (
          <li key={i} style={{ margin: '8px 0' }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
