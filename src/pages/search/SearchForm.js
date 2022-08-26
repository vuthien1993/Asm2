import React, { useState } from "react";
import ResultList from "./ResultList";
import CartIcon from "../../component/Cart/CartIcon";

import "bootstrap/dist/css/bootstrap.css";
import "./SearchForm.css";
function SearchForm() {
  const [enteredInput, setEnteredInput] = useState("");

  const inputChangeHandler = (event) => {
    setEnteredInput(event.target.value);
  };
  const searchHandler = (event) => {
    event.preventDefault();
    console.log(enteredInput);
  };
  return (
    <div className="borderSearch">
      <div className="borderSearchForm">
        <form onSubmit={searchHandler}>
          <div className="borderForm">
            <input type="text" className="flls" onChange={inputChangeHandler} />
            <button className="iconSearch flls">
              <CartIcon />
            </button>
          </div>
        </form>
        <hr />
        <div className="borderSearchButton ">
          <button>Reset</button>
          <button>Search</button>
        </div>
      </div>
      <ResultList query={enteredInput} />
    </div>
  );
}

export default SearchForm;
