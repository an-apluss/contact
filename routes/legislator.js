const express = require("express");
require("dotenv/config");

const { getAuthToken, getSpreadSheet } = require("../services/googleservice");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const auth = await getAuthToken();
    const spreadSheet = await getSpreadSheet(
      auth,
      process.env.LEGISLATOR_SPREADSHEET_ID,
      process.env.LEGISLATOR_SPREADSHEET_RANGE
    );
    const data = spreadSheet.data.values;

    if (!data.length) {
      return res.status(404).json({ msg: "No contact was found" });
    }

    // console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
