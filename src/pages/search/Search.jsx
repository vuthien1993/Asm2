import React from "react";
import NavBar from "../../component/Layout/NavBar";
import SearchForm from "./SearchForm";

const Search = () => {
  return (
    <div className="app">
      <NavBar />
      <div>
        <SearchForm />
      </div>
    </div>
  );
};

export default Search;
