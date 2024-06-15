import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import './App.css';
import './components/style.css';
import { useDebouncedEffect } from './hooks/useDebouncedEffect';

const API_KEY = 'h_PBaEIqECJm_gSEZty4SQ2Jc6J2kMX8u187SKhH6P4';
const UNSPLASH_API = 'https://api.unsplash.com';

const App = () => {
  const [search, setSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios
      .get(`${UNSPLASH_API}/photos?client_id=${API_KEY}`)
      .then((response) => setImages(response.data))
      .catch((error) => console.error('Error fetching images:', error));
  }, []);

  const handleSearch = (query) => {
    if (query !== '') {
      axios
        .get(`${UNSPLASH_API}/search/photos?query=${query}&client_id=${API_KEY}`)
        .then((response) => setResults(response.data.results))
        .catch((error) => console.error('Error searching images:', error));
    } else {
      setResults([]);
    }
    setSearchQuery(query);
  };

  useDebouncedEffect(() => handleSearch(search), 500, [search]);

  const displayedImages = searchQuery ? results : images;

  return (
    <Container className="py-5">
      <h1 className="text-center pb-2">Image Search App 📸</h1>
      <div className="pb-5 text-center">
        <input
          className="inputStyle col-6 py-2"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for Images..."
        />
      </div>
      {searchQuery && displayedImages.length === 0 && (
        <p className="text-center col-12">No Result Found</p>
      )}
      <div className="contain">
        {displayedImages.map((img, key) => (
          <img src={img.urls.regular} key={key} className="image" />
        ))}
      </div>
    </Container>
  );
};

export default App;
