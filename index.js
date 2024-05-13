const express = require("express");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const HttpError = require("./models/Http-Error");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use("/products", productRoutes);
app.use("/users", userRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred" });
});

app.listen(process.env.PORT, () => {
  console.log("Listening... ");
});
