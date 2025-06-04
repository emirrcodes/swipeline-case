require("dotenv").config();

const { google } = require("googleapis");
const keys = require("./credentials.json");

const auth = new google.auth.GoogleAuth({
  credentials: keys,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const SHEET_ID = process.env.GOOGLE_SHEETS_ID;

async function appendToSheet({
  username,
  tweet,
  sentiment,
  summary,
  datetime,
}) {
  try {
    if (!SHEET_ID) {
      throw new Error("GOOGLE_SHEETS_ID .env dosyasında tanımlı değil!");
    }
    const client = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: client });

    const sheetInfo = await sheets.spreadsheets.get({
      spreadsheetId: SHEET_ID,
    });

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: "Sayfa1!A:E",
      valueInputOption: "RAW",
      requestBody: {
        values: [[username, tweet, sentiment, summary, datetime]],
      },
    });

    return response;
  } catch (err) {
    console.error("appendToSheet detailed error:", {
      message: err.message,
      response: JSON.stringify(err.response?.data, null, 2),
      status: err.response?.status,
    });
    throw err;
  }
}

module.exports = appendToSheet;
