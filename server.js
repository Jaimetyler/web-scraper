const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
var exphbs = require("express-handlebars");

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

// Handlebars
// app.engine(
//     "handlebars",
//     exphbs({
//       defaultLayout: "main"
//     })
//   );
//   app.set("view engine", "handlebars");

  //routesnode server

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/articledb", { useNewUrlParser: true });

//scraping espn.com/mma/
app.get ('/scrape', (req,res) => {
    axios.get('https://www.espn.com/mma/').then((response) => {
        const $ = cheerio.load(response.data);

        // $('article.contentItem').each((i, element) => {
          $('section.contentItem').each((i, element) => {
            let testDig = $(this).children('a').attr('href');
            // console.log(element);
            console.log("test: ", testDig);
            let result = {};
            result.headline = $(this).find('.contentItem_titleWrapper').children('h1').text();
            result.summary = $(this).find('.contentItem_titleWrapper').children('p').text();
            result.link = $(this).find('a').attr('href');
            // result.image = $(this).children('p').attr("srcset");

            db.Article.create(result).then((dbArticle) => {
                // console.log(dbArticle);
            })
            .catch((err) => {
                // console.log(err);
            });
        });
        res.send("Scrape Comlete")
    });
});

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});