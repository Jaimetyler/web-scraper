const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
const exphbs = require("express-handlebars");
const db = require("./models");
const path = require("path");

const PORT = 3000;

// Requiring the `User` model for accessing the `users` collection
// const scraper = require("./scraper")
// Initialize Express
const app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

//Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

require('./public/routes/routes');

//routesnode server

// require('./public/routes/apiRoutes')(app);
// require('./public/routes/htmlRoutes')(app);
// require('./public/routes/scrape')(app);

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/articledb", { useNewUrlParser: true });

app.get('/scrape', function (req, res) {

  axios.get('https://www.digg.com/channel/science').then((response) => {
    // const axiosRes = axios.get('https://www.digg.com/channel/technology')

    const $ = cheerio.load(response.data);

    $('article').each(function () {
      let result = {};
      result.link = $(this).attr('data-contenturl');
      result.headline = $(this).find('h2').text();
      result.comment = $(this).find('div.digg-story__description').text();
      result.image = $(this).find('figure.digg-story__image').find('a').children('img').attr('src');

     console.log(result);

      // db.Article.create(result).then(function (dbArticle) {
      db.Header.create(result).then(function (dbHeader) {
        console.log(dbHeader);
      })
        .catch(function (err) {
          console.log(err);
        });
      // });
      res.send("Scrape Complete")
    });
    res.redirect('/');
  });
});

app.get("/", function(req, res) {
  res.render(path.join(__dirname, "public/index.html"));
});


app.get("/headers", function (req, res) {
  db.Header.find({})
    .then(function (dbHeader) {
      res.json(dbHeader);
    })
    .catch(function (err) {
      res.json(err);
    });
});

app.get("/headers/:id", function (req, res) {
  db.Header.findOne({ _id: req.params.id })
    .populate("comment")
    .then(function (dbHeader) {
      res.json(dbHeader);
    })
      .catch(function (err) {
        res.json(err);
      });
});

app.post("/headers/:id", function (req, res) {
  db.Comment.create(req.body)
    .then(function (dbComment) {
      return db.Header.findOneAndUpdate({ _id: req.params.id }, { comment: dbComment._id }, { new: true });
    })
    .then(function (dbHeader) {
      res.json(dbHeader);
    })
    .catch(function (err) {

      res.json(err);
    });
});


// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});