var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require("./models/comment");
var data = [
    {
        name: "Clouds Rest",
        image: "https://farm4.staticflickr.com/3833/9923522516_12b572507c.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Traditur, inquit, ab Epicuro ratio neglegendi doloris. Quamvis enim depravatae non sint, pravae tamen esse possunt. In qua quid est boni praeter summam voluptatem, et eam sempiternam? Duo Reges: constructio interrete. Cum id fugiunt, re eadem defendunt, quae Peripatetici, verba. Multa sunt dicta ab antiquis de contemnendis ac despiciendis rebus humanis; Hic, qui utrumque probat, ambobus debuit uti, sicut facit re, neque tamen dividit verbis. Minime vero, inquit ille, consentit."
    },
    {
        name: "Sky Rest",
        image: "https://farm4.staticflickr.com/3833/9923522516_12b572507c.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Traditur, inquit, ab Epicuro ratio neglegendi doloris. Quamvis enim depravatae non sint, pravae tamen esse possunt. In qua quid est boni praeter summam voluptatem, et eam sempiternam? Duo Reges: constructio interrete. Cum id fugiunt, re eadem defendunt, quae Peripatetici, verba. Multa sunt dicta ab antiquis de contemnendis ac despiciendis rebus humanis; Hic, qui utrumque probat, ambobus debuit uti, sicut facit re, neque tamen dividit verbis. Minime vero, inquit ille, consentit."
    },
    {
        name: "Achill Rest",
        image: "https://farm4.staticflickr.com/3833/9923522516_12b572507c.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Traditur, inquit, ab Epicuro ratio neglegendi doloris. Quamvis enim depravatae non sint, pravae tamen esse possunt. In qua quid est boni praeter summam voluptatem, et eam sempiternam? Duo Reges: constructio interrete. Cum id fugiunt, re eadem defendunt, quae Peripatetici, verba. Multa sunt dicta ab antiquis de contemnendis ac despiciendis rebus humanis; Hic, qui utrumque probat, ambobus debuit uti, sicut facit re, neque tamen dividit verbis. Minime vero, inquit ille, consentit."
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
                            console.log("added comment");
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