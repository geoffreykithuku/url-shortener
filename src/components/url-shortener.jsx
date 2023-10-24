import React, { useState } from "react";
import url_shortener_logo from "./url-shortener-logo.png";
import ShortenedLink from "./ShortenedLink";

const UrlShortener = ({ inputValue, setInputValue }) => {
  const [value, setValue] = useState("");

  const handleClick = () => {
    setInputValue(value);
    setValue("");
  };

  return (
    <div className="container">
      <div className="logo">
        <img src={url_shortener_logo} alt="url-shortener logo" />
      </div>
      <h1>
        Simplify Your Links: A Powerful{" "}
        <span className="span">URL Shortening</span> Solution
      </h1>
      <div className="wrapper">
        <div className="input-div">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Paste a link here..."
          />
          <button onClick={handleClick}>Shorten</button>
        </div>

        <ShortenedLink inputValue={inputValue} />
      </div>
    </div>
  );
};

export default UrlShortener;
