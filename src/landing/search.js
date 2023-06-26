import React, { useState } from "react";

const CardSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    // Perform search logic here, e.g., fetch data from an API
    // and update the searchResults state with the matching data

    // For demo purposes, let's assume we have some mock data
    const mockData = [
      { id: 1, title: "Card 1", description: "This is card 1" },
      { id: 2, title: "Card 2", description: "This is card 2" },
      { id: 3, title: "Card 3", description: "This is card 3" },
    ];

    const filteredResults = mockData.filter((card) =>
      card.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(filteredResults);
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search..."
        />
        <button type="submit">Search</button>
      </form>

      <div>
        {searchResults.map((card) => (
          <div key={card.id}>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSearch;