var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require("./models/comment");
var data = [
    {
        name: "Clouds Rest",
        image: "https://farm4.staticflickr.com/3833/9923522516_12b572507c.jpg",
        description: "blahblah"
    },
    {
        name: "Sky Rest",
        image: "https://farm4.staticflickr.com/3833/9923522516_12b572507c.jpg",
        description: "blah    blah"
    },
    {
        name: "Achill Rest",
        image: "https://farm4.staticflickr.com/3833/9923522516_12b572507c.jpg",
        description: "Achill Island"
    }
];
function seedDB() {
    Campground.remove({}, function (err) {
        if(err){
            console.log(error);
        }else{
            console.log("removed");
        }

        data.forEach(function(seed){
            Campground.create(seed, function (err, campground) {
                if(err){
                    console.log(err);
                }else{
                    console.log("added");
                    Comment.create({
                        text: "this is good",
                        author: "Me"
                    }, function (err, comment) {
                        if(err){
                            console.log(err);
                        }else{
                            campground.comments.push(comment);
                            campground.save();
                        }
                    });
                }
            });
        });

    });

}

module.exports = seedDB;