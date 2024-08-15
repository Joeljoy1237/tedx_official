import { google, sheets_v4 } from "googleapis";

const sheets = google.sheets("v4");

type AppendValuesResponse = sheets_v4.Schema$AppendValuesResponse;

export const getGoogleSheetsClient = () => {
  return new google.auth.JWT({
    email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL!,
    key: process.env.GOOGLE_SHEETS_PRIVATE_KEY!.replace(/\\n/g, "\n"), // Handle newline characters in the key
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
};

export const getSheetData = async (range: any) => {
  const auth = getGoogleSheetsClient();

  const response = await sheets.spreadsheets.values.get({
    auth,
    spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
    range,
  });

  return response.data.values;
};

export const appendToSheet = async (range: string, values: any[][]): Promise<AppendValuesResponse> => {
  const auth = getGoogleSheetsClient();

  const response = await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID!,
    range,
    valueInputOption: "RAW",
    requestBody: {
      values,
    },
    auth,
  });

  return response.data;
};