const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
dotenv.config({ path: "./config/env/config.env" });

const PORT = process.env.PORT || 5000;
app.use(cors());

app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}`)
);
