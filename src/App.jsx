import { Input } from "antd";
import React, { useState, useEffect, Component } from "react";
import { Button, Container } from "react-bootstrap";
import './App.css';
import {LoadImages,SearchImages} from './components/api'
import Image from './components/image';
import SearchQuery from "./components/search";
import "./components/style.css";

function App() {
  const [searchQ, setSearchQ] = useState()
  const [query, setQuery] = useState()

  const data = LoadImages();
  console.log(data);
  const search = () => {
    setSearchQ(query);
  }
  const searchData = SearchImages(searchQ);

  const reset = () => {
    setSearchQ('');
  }
  return (
    <Container className="py-5">
      <h1 className="text-center pb-2 ">Image Search App 📸</h1>
      <div className="pb-5">
        <div className="text-center">
        <Input
        className="inputStyle col-6 py-2"
        style={{borderRadius: '30px'}}
        type="text"
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for Images..."
        />
        <Button className="search mx-5" onClick={search} >
          Search
        </Button>
        </div>
        <div onClick={reset} className="text-center">{searchQ && ('Reset')}</div>
      </div>
      {searchData && searchQ && searchData.length == 0 && <p className="text-center col-12">No Result Found</p>}
      <div className="contain">
      {searchQ ?  searchData.map((img, key) => (  <Image src={img.urls.thumb} key={key} />)) : data.map((img, key) => (
        <Image src={img.urls.thumb} key={key}/>
      ))}
      </div>
    </Container>
  );
}

export default App;