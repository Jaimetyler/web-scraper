// Grab the articles as a json
$.getJSON("/headers", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $(".card-text").append("<p data-id='" + data[i]._id + "'>" + data[i].headline + "<br />" + "<a href=http://www.digg.com/channel/longreads" + data[i].link +">" + data[i].link + "</a></p>");
      console.log("data log: ", data);
      
    }
  });

    // $.ajax({
    //     method: "GET",
    //     url: "/headers/" + thisId
    //   })
    //     .then(function(data) {
          
    //       $(".card-title").append("<h2>" + data.headline + "</h2>");
         
    // });
    
  