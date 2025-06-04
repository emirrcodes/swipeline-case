import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import axios from "axios";
import { FaTwitter } from "react-icons/fa";

function App() {
  const [tweetURL, setTweetURL] = useState("");
  const [manualInput, setManualInput] = useState({ username: "", tweet: "" });
  const [result, setResult] = useState(null);
  const [selectedMode, setSelectedMode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    if (selectedMode === "link" && !tweetURL) {
      setResult({ error: "Enter a tweet URL please!" });
      return;
    }
    if (selectedMode === "manual" && !manualInput.tweet) {
      setResult({ error: "Enter a tweet content please!" });
      return;
    }
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:3001/analyze", {
        tweetURL: selectedMode === "link" ? tweetURL : undefined,
        manualInput: selectedMode === "manual" ? manualInput : undefined,
      });
      setResult(res.data);
      toast.success(
        <span>
          Result is saved in{" "}
          <a
            href="https://docs.google.com/spreadsheets/d/1La3s4tSLambY-fUcVeAc2a4fnIwPxVQoxxazeJfUHhk"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#1da1f2", textDecoration: "underline" }}
          >
            Google Sheet
          </a>
          !
        </span>,
        {
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        }
      );
    } catch (err) {
      console.error("err: ", err);
      setResult({ error: "Analyzse failed, try again!" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#e6ecf0",
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        padding: "1rem",
        boxSizing: "border-box",
        overflowY: "auto",
      }}
    >
      <div style={{ textAlign: "center", width: "100%", maxWidth: "600px" }}>
        <div style={{ marginTop: "1rem", marginBottom: "1.5rem" }}>
          <span
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              color: "#1da1f2",
              fontWeight: "bold",
              verticalAlign: "middle",
            }}
          >
            Tweet Analyzer
          </span>
          <FaTwitter
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              color: "#1da1f2",
              marginLeft: "0.5rem",
              verticalAlign: "middle",
            }}
          />
        </div>

        <div
          style={{
            marginBottom: "1.5rem",
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => setSelectedMode("link")}
            style={{
              padding: "clamp(0.5rem, 2vw, 0.8rem) clamp(1rem, 3vw, 1.5rem)",
              fontSize: "clamp(0.9rem, 2.5vw, 1.2rem)",
              backgroundColor: selectedMode === "link" ? "#1da1f2" : "#ccc",
              color: selectedMode === "link" ? "white" : "black",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            URL Entry
          </button>
          <button
            onClick={() => setSelectedMode("manual")}
            style={{
              padding: "clamp(0.5rem, 2vw, 0.8rem) clamp(1rem, 3vw, 1.5rem)",
              fontSize: "clamp(0.9rem, 2.5vw, 1.2rem)",
              backgroundColor: selectedMode === "manual" ? "#1da1f2" : "#ccc",
              color: selectedMode === "manual" ? "white" : "black",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Manuel Entry
          </button>
        </div>

        {selectedMode === "link" && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "0.5rem",
              }}
            >
              <input
                type="text"
                placeholder="Tweet URL (e.g: https://x.com/username/status/123456789)"
                value={tweetURL}
                onChange={(e) => setTweetURL(e.target.value)}
                style={{
                  width: "min(80vw, 400px)",
                  height: "clamp(40px, 10vw, 50px)",
                  padding: "0 clamp(10px, 2vw, 15px)",
                  borderRadius: "5px 0 0 5px",
                  border: "1px solid #ccc",
                  fontSize: "clamp(14px, 3vw, 18px)",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
              <button
                onClick={handleAnalyze}
                style={{
                  height: "clamp(40px, 10vw, 50px)",
                  padding: "0 clamp(15px, 3vw, 25px)",
                  borderRadius: "0 5px 5px 0",
                  border: "none",
                  backgroundColor: isLoading ? "#1da1f2" : "#1da1f2",
                  color: "white",
                  fontSize: "clamp(14px, 3vw, 18px)",
                  fontWeight: "bold",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span
                    style={{
                      display: "inline-block",
                      width: "20px",
                      height: "20px",
                      border: "3px solid #fff",
                      borderTop: "3px solid transparent",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                ) : (
                  "Analyze"
                )}
                <style>
                  {`
                    @keyframes spin {
                      0% { transform: translate(-50%, -50%) rotate(0deg); }
                      100% { transform: translate(-50%, -50%) rotate(360deg); }
                    }
                  `}
                </style>
              </button>
            </div>
            <div
              style={{
                backgroundColor: "#e6ecf0",
                color: "green",
                padding: "clamp(0.5rem, 1vw, 1rem)",
                borderRadius: "5px",
                width: "min(80vw, 400px)",
                fontSize: "clamp(12px, 2.5vw, 14px)",
                marginBottom: "0.5rem",
              }}
            >
              In free trial of X API we have 1 request per 15 minutes !
            </div>
          </div>
        )}

        {selectedMode === "manual" && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <input
              type="text"
              placeholder="Username (e.g: @Swipeline_tr)"
              value={manualInput.username}
              onChange={(e) =>
                setManualInput({ ...manualInput, username: e.target.value })
              }
              style={{
                width: "min(80vw, 400px)",
                height: "clamp(40px, 10vw, 50px)",
                padding: "0 clamp(10px, 2vw, 15px)",
                border: "1px solid #ccc",
                borderRadius: "5px",
                fontSize: "clamp(14px, 3vw, 18px)",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            <textarea
              placeholder="Type the content..."
              value={manualInput.tweet}
              onChange={(e) =>
                setManualInput({ ...manualInput, tweet: e.target.value })
              }
              style={{
                width: "min(80vw, 400px)",
                height: "clamp(100px, 20vw, 120px)",
                padding: "clamp(10px, 2vw, 15px)",
                border: "1px solid #ccc",
                borderRadius: "5px",
                fontSize: "clamp(14px, 3vw, 18px)",
                outline: "none",
                resize: "vertical",
                marginTop: "0.5rem",
                boxSizing: "border-box",
              }}
            />
            <button
              onClick={handleAnalyze}
              style={{
                height: "clamp(40px, 10vw, 50px)",
                padding: "0 clamp(15px, 3vw, 25px)",
                borderRadius: "5px",
                border: "none",
                backgroundColor: isLoading ? "#1da1f2" : "#1da1f2",
                color: "white",
                fontSize: "clamp(14px, 3vw, 18px)",
                fontWeight: "bold",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <span
                  style={{
                    display: "inline-block",
                    width: "20px",
                    height: "20px",
                    border: "3px solid #fff",
                    borderTop: "3px solid transparent",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              ) : (
                "Analyze"
              )}
              <style>
                {`
                    @keyframes spin {
                      0% { transform: translate(-50%, -50%) rotate(0deg); }
                      100% { transform: translate(-50%, -50%) rotate(360deg); }
                    }
                  `}
              </style>
            </button>
          </div>
        )}

        {result && (
          <div
            style={{
              marginTop: "1.5rem",
              padding: "1rem",
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              width: "min(80vw, 400px)",
              textAlign: "left",
              margin: "1.5rem auto 1rem",
              color: "black",
              boxSizing: "border-box",
            }}
          >
            {result.error ? (
              <p style={{ color: "red" }}>
                {result.error.includes("Too Many Requests")
                  ? "X API limit exceeded, please wait 15-30 minutes!"
                  : result.error}
              </p>
            ) : (
              <>
                <p>
                  <strong>Username:</strong> {result.username}
                </p>
                <p>
                  <strong>Tweet:</strong> {result.tweet}
                </p>
                <p>
                  <strong>Summary:</strong> {result.summary}
                </p>
                <p>
                  <strong>Emotion:</strong> {result.sentiment}
                </p>
                <p>
                  <strong>Date:</strong> {result.datetime}
                </p>
              </>
            )}
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
