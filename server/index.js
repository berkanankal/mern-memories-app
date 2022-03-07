const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const posts = require("./routes/posts");
const customErrorHandler = require("./middlewares/error/customErrorHandler");

const app = express();
dotenv.config({ path: "./config/env/config.env" });
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/posts", posts);
app.use(customErrorHandler);
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server started on http://localhost:${PORT}`)
    )
  )
  .catch((err) => console.error(err));
