const axios = require('axios');
const cheerio = require('cheerio');


module.exports = function (app) {
    app.get('/scrape', function (req, res) {
        axios.get('https://www.digg.com/channel/technology').then((response) => {
            const $ = cheerio.load(response.data);

            $('article').each(function (i, element) {
                let result = {};

                result.headline = $(this).find('h2').text();
                result.summary = $(this).find('h2').text();
                result.link = $(this).find('header').children('h2').children('a').attr('href');

                console.log(result);

                db.Article.create(result).then(function (dbArticle) {
                    console.log(dbArticle);
                })
                    .catch(function (err) {
                        console.log(err);
                    });
            });
            res.send("Scrape Complete");
        });
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
};