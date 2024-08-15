import { google } from "googleapis";

const sheets = google.sheets("v4");

export const getGoogleSheetsClient = () => {
  return new google.auth.JWT({
    email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, "\n"), // Handle newline characters in the key
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
};

export const getSheetData = async (range) => {
  const auth = getGoogleSheetsClient();

  const response = await sheets.spreadsheets.values.get({
    auth,
    spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
    range,
  });

  return response.data.values;
};

export const appendToSheet = async (range, values) => {
  const auth = getGoogleSheetsClient();

  const response = await sheets.spreadsheets.values.append({
    auth,
    spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
    range,
    valueInputOption: "RAW",
    resource: {
      values,
    },
  });

  return response;
};
