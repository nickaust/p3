const express = require("express");
const { coinCombo, coinValue } = require("./p3-module");

const app = express();
const HOST = "localhost";
const PORT = 8080;

// Serve static files from public folder
app.use(express.static("public"));

// /coincombo route
app.get("/coincombo", (req, res) => {
  const amount = Number(req.query.amount);

  if (isNaN(amount) || amount < 0) {
    return res.status(400).json({
      error: "Invalid amount parameter",
    });
  }

  res.json(coinCombo(amount));
});

// /coinvalue route
app.get("/coinvalue", (req, res) => {
  const params = req.query;
  const coinCounts = {
    pennies: parseInt(params.pennies) || 0,
    nickels: parseInt(params.nickels) || 0,
    dimes: parseInt(params.dimes) || 0,
    quarters: parseInt(params.quarters) || 0,
    halves: parseInt(params.halves) || 0,
    dollars: parseInt(params.dollars) || 0,
  };

  res.json(coinValue(coinCounts));
});

// 404 handler
app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

// Start server
app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
