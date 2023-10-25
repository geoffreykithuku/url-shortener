import React, { useEffect, useState } from "react";
import { Copy, CheckSquare } from "lucide-react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BarLoader } from "react-spinners";

const url = process.env.REACT_APP_URL;

const ShortenedLink = ({ inputValue }) => {
  const [shortened, setShortened] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [copied]);

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(
      `https://api.tinyurl.com/create?api_token=4vzhSYit9AnNm23h6z3OuG2gF2swB0BjvYGjgQJ8CHeCOhBRAHEBuzv8F4lt`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: inputValue,
          domain: "tinyurl.com",
        }),
      }
    );

    const data = await response.json();
    setShortened(data.data.tiny_url);
    setLoading(false);
  };

  useEffect(() => {
    if (inputValue.length > 0) {
      fetchData();
    }
  }, [inputValue]);

  if (loading) {
    return (
      <div className="spinner">
        <BarLoader color="#36d7b7" />
      </div>
    );
  }
  return (
    <div>
      {shortened ? (
        <>
          <p className="heading"> Click to copy:</p>
          <CopyToClipboard text={shortened} onCopy={() => setCopied(true)}>
            <div className="result">
              <p className={copied ? "copied" : "not-copied"}>{shortened}</p>
              <span>
                {copied ? (
                  <CheckSquare size={16} color="#8a76c1" strokeWidth={1} />
                ) : (
                  <Copy size={16} color="#8a76c1" strokeWidth={1} />
                )}
              </span>
            </div>
          </CopyToClipboard>
        </>
      ) : null}
    </div>
  );
};

export default ShortenedLink;
