import { useState } from "react";
import "./App.css";
import UrlShortener from "./components/url-shortener";

function App() {
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="App">
      <UrlShortener inputValue={inputValue} setInputValue={setInputValue} />
      <div class="background">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}

export default App;
