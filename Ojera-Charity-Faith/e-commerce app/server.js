const express = require('express');
const path = require('path');
const app = express();
const PORT = 3002;




mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .once("open", () => {
    console.log("Mongoose connection open");
  })
  .on("error", err => {
    console.error(`Connection error: ${err.message}`);
  });

// set view engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// middleware
// Static data
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api/dashboard', (req, res) => {
  res.json(dashboardData);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});