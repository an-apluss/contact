const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

app.use(helmet());
app.use(morgan("combined"));
app.use(express.json({ extended: true }));

app.get("/", (req, res) => res.send("API running..."));

//define routes
app.use("/api/v1/contact/legislator", require("./routes/legislator"));
app.use("/api/v1/contact/friend", require("./routes/friend"));

const PORT = process.env.PORT || "9110";

app.listen(PORT, () =>
  console.log(`server started! Listening to port:${PORT}...`)
);
