const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug'); // or use HTML if preferred

// Database connection
mongoose.connect('mongodb://127.0.0.1:27017/assessment', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Routes
const formRoutes = require('./routes/formRoutes');
app.use('/index', formRoutes);

// Home form route
app.get('/', (req, res) => {
  res.render('form');
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
