import React, { useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20, fontFamily: "Arial" }}>
      <h1>ItemElites</h1>
      <input
        type="text"
        placeholder="Search for an item..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: "80%", padding: 8, fontSize: 16 }}
      />
      <button onClick={handleSearch} style={{ padding: "9px 15px", marginLeft: 10, fontSize: 16 }}>
        Search
      </button>
      {loading && <p>Loading...</p>}
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {results.map((item, i) => (
          <li key={i} style={{ marginTop: 20, borderBottom: "1px solid #ddd", paddingBottom: 10 }}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p><b>Price:</b> {item.price}</p>
            {item.image && <img src={item.image} alt={item.name} style={{ maxWidth: 150 }} />}
            <p><a href={item.link} target="_blank" rel="noreferrer">View Product</a></p>
          </li>
        ))}
      </ul>
    </div>
  );
}