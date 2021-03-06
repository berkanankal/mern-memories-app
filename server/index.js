const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const posts = require("./routes/posts");
const customErrorHandler = require("./middlewares/error/customErrorHandler");
const path = require("path");

const app = express();
dotenv.config({ path: "./config/env/config.env" });
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use("/posts", posts);
app.use(customErrorHandler);

app.use(express.static(path.join(__dirname, "public")));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server started on http://localhost:${PORT}`)
    )
  )
  .catch((err) => console.error(err));
