const { google } = require("googleapis");
const creds = require("../n-facility.json");

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

async function getAuthToken() {
  const { client_email, private_key } = creds;
  const auth = new google.auth.JWT(client_email, null, private_key, SCOPES);

  await auth.authorize((err, token) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log("Google AUTH established!");
  });
  
  return auth;
}

async function getSpreadSheet(authToken, spreadsheetId, range) {
  const googleApiRes = google.sheets({ version: "v4", auth: authToken });
  const options = {
    spreadsheetId,
    range,
  };

  const data = await googleApiRes.spreadsheets.values.get(options);
  return data;
}

module.exports = {
  getAuthToken,
  getSpreadSheet,
};
