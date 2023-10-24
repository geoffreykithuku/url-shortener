import React, { useEffect, useState } from "react";
import { Copy, CheckSquare } from "lucide-react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const ShortenedLink = ({ inputValue }) => {
  const [shortened, setShortened] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [copied]);

  const fetchData = async () => {
    const response = await fetch(`https://shrtlnk.dev/api/v2/link`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "api-key": process.env.API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: inputValue,
      }),
    });

    const data = await response.json();
    setShortened(data.shrtlnk);
  };

  useEffect(() => {
    if (inputValue.length > 0) {
      fetchData();
    }
  }, [inputValue]);

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
