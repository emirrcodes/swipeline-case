const appendToSheet = require("./googleSheets");
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const OAuth = require("oauth-1.0a");
const crypto = require("crypto");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent`;
const X_API_KEY = process.env.X_API_KEY;
const X_API_SECRET = process.env.X_API_SECRET;
const X_ACCESS_TOKEN = process.env.X_ACCESS_TOKEN;
const X_ACCESS_TOKEN_SECRET = process.env.X_ACCESS_TOKEN_SECRET;

if (!X_API_KEY || !X_API_SECRET || !X_ACCESS_TOKEN || !X_ACCESS_TOKEN_SECRET) {
  console.error("X API keys are missing in .env");
  process.exit(1);
}

const oauth = OAuth({
  consumer: { key: X_API_KEY, secret: X_API_SECRET },
  signature_method: "HMAC-SHA1",
  hash_function(baseString, key) {
    return crypto.createHmac("sha1", key).update(baseString).digest("base64");
  },
});

app.post("/analyze", async (req, res) => {
  const { tweetURL, manualInput } = req.body;
  const datetime = new Date().toISOString();

  let username, tweet;

  if (manualInput) {
    username = manualInput.username || "@manualuser";
    tweet = manualInput.tweet || "Empty tweet was entered!";
  } else if (tweetURL) {
    const tweetIdMatch = tweetURL.match(/status\/(\d+)/);
    if (!tweetIdMatch) {
      return res.status(400).json({ error: "Invalid tweet URL" });
    }
    const tweetId = tweetIdMatch[1];

    try {
      const requestData = {
        url: `https://api.x.com/2/tweets/${tweetId}`,
        method: "GET",
      };
      const token = {
        key: X_ACCESS_TOKEN,
        secret: X_ACCESS_TOKEN_SECRET,
      };
      const authHeader = oauth.toHeader(oauth.authorize(requestData, token));
      const xResponse = await axios.get(requestData.url, {
        headers: {
          Authorization: authHeader["Authorization"],
          "User-Agent": "v2TweetLookupJS",
        },
      });

      console.log(xResponse);

      tweet = xResponse.data.data.text;
      username = xResponse.data.data.author_id || "@unknown";
    } catch (err) {
      console.error(
        "X API Error:",
        JSON.stringify(err.response?.data, null, 2)
      );
      return res
        .status(500)
        .json({ error: "Failed to fetch tweet", details: err.message });
    }
  } else {
    return res
      .status(400)
      .json({ error: "Please provide a tweet URL or enter manually!" });
  }

  try {
    const prompt = `Tweet: "${tweet}"\nPlease summarize the content of this tweet (1-2 sentences) and analyze the sentiment (positive / negative / neutral).\nResponse format:\nSummary: ...\nSentiment: ...`;

    const geminiResponse = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      { contents: [{ role: "user", parts: [{ text: prompt }] }] },
      { headers: { "Content-Type": "application/json" } }
    );

    const text = geminiResponse.data.candidates[0].content.parts[0].text;
    const lines = text.split("\n");
    const summaryLine = lines.find((line) =>
      line.toLowerCase().includes("summary")
    );
    const sentimentLine = lines.find((line) =>
      line.toLowerCase().includes("sentiment")
    );

    const summary = summaryLine
      ? summaryLine.replace(/summary:/i, "").trim()
      : "-";
    const sentiment = sentimentLine
      ? sentimentLine.replace(/sentiment:/i, "").trim()
      : "-";

    const data = { username, tweet, summary, sentiment, datetime };

    await appendToSheet(data).catch((sheetErr) => {
      console.error(
        "appendToSheet Error:",

        JSON.stringify(sheetErr.response?.data, null, 2)
      );
      throw sheetErr;
    });
    res.json(data);
  } catch (err) {
    console.error(
      "General Error:",

      JSON.stringify(err.response?.data, null, 2)
    );
    res.status(500).json({ error: "Analyze failed", details: err.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Backend is running on port ${PORT}!`));
