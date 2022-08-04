import { Input } from "antd";
import React, { useState } from "react";

function SearchQuery(props) {
  const [query1, setQuery1] = useState();
  function search() {
    props.search(query1);
  }
  return (
    <>
      <p onClick={search}>Click</p>
      <Input
        className="inputStyle"
        type="text"
        onChange={(e) => setQuery1(e.target.value)}
        placeholder="Search for Images Here..."
      />
    </>
  );
}

export default SearchQuery;
