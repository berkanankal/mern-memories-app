const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
dotenv.config({ path: "./config/env/config.env" });

const PORT = process.env.PORT || 5000;
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server started on http://localhost:${PORT}`)
    )
  )
  .catch((err) => console.error(err));
