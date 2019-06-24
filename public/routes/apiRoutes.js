module.exports = (app) => {
    app.get ('/scrape', (req,res) => {
        axios.get('https://www.espn.com/mma/').then((response) => {
            const $ = cheerio.load(response.data);
    
            $('source').each((i, element) => {
                let result = {};
    
                result.image = $(this).children('source').attr("srcset");
                result.link = $(this).children('a').attr('href');
    
                db.Article.create(result).then((dbArticle) => {
                    console.log(dbArticle);
                })
                .catch((err) => {
                    console.log(err);
                });
            });
            res.send("Scrape Comlete")
        });
    });
}