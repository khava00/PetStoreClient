import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { listProductSuggest } from "../redux/Actions/ProductActions";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { convertURL } from "../redux/Actions/ProductActions";
const Autocomplete = (props) => {
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState("");
  const { suggestions } = props;
  const navigate = useNavigate()
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInput !== "") {
      dispatch(listProductSuggest(userInput, 1, 9));
    }
  }, [userInput, dispatch]);

  const onChange = (e) => {
    setActiveSuggestion(0);
    setFilteredSuggestions(suggestions);
    setShowSuggestions(true);
    setUserInput(e.currentTarget.value);

  };

  const onClick = (e) => {
    setActiveSuggestion(0);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    setUserInput(e.currentTarget.innerText);
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      setActiveSuggestion(0);
      setShowSuggestions(false);
      if (userInput!=="" && e.keyCode === 13){
        navigate(`/pages/${userInput}`)
      }else {
        toast.error("Bạn chưa nhập từ khóa tìm kiếm")
      }
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      setActiveSuggestion(activeSuggestion - 1);
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      setActiveSuggestion(activeSuggestion + 1);
    }
  };

  let suggestionsListComponent;
  if (showSuggestions && userInput) {
    if (filteredSuggestions.length) {
      suggestionsListComponent = (
        <ul className="suggestions">
          {filteredSuggestions?.map((suggestion, index) => {
            let className;

            // Flag the active suggestion with a class
            if (index === activeSuggestion) {
              className = "suggestion-active";
            }
            return (
              <li className={className} key={suggestion.id} onClick={onClick}>
                <div className="suggestion-item">
                  <Link to={`/product/${suggestion.id}`}>
                    <img src={`${process.env.REACT_APP_API_ENDPOINT}${suggestion.imagePath}`} alt="" />
                    <span>{suggestion.name}</span>
                  </Link>
                </div>

              </li>
            );
          })}
        </ul>
      );
    } else {
      suggestionsListComponent = (
        <ul class="suggestions">
          <div className="suggestion-item">
            <span>No suggestions available.</span>
          </div>
        </ul>
      );
    }
  }

  return (
    <form class="search-form">
      <input
        id="user-input"
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={userInput}
      />
      {suggestionsListComponent}
    </form>
  );
};

export default Autocomplete;
