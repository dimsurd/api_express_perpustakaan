require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const userRoute = require("./routes/users");
const logPath = require("./middleware/logs");

app.listen(PORT, (req, res) => {
  console.log(`Server running at port ${PORT}`);
});

// Allowing JSON to parse in body
app.use(express.json());
// End Allowing JSON to parse in body

app.use(logPath);

app.use("/users", userRoute);
