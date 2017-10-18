var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/campsite')
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Achill Winds",
//         image: "https://farm6.staticflickr.com/5136/5391759757_dd33e4ecc8.jpg",
//         description: "This is a big campsite that can accommodate a small family"
//
//     }, function (err, campground) {
//         if(err){
//             console.log(err);
//         }else{
//             console.log('Newly created campground');
//             console.log(campground);
//         }
//     });
app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
})

app.get("/campgrounds/:id", function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
       if(err){
           console.log(err);
       } else{
           res.render('show', {campground: foundCampground});

       }
    });
})

app.get("/", function(req, res){
    res.render("landing");
});

app.post("/campgrounds", function(req, res){
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = {name: name, image: image, description: desc};
  Campground.create(newCampground, function (err, newCreated) {
      if(err){
          console.log(err);
      }else{
          res.redirect("/campgrounds");
      }
  });
});

app.get("/campgrounds", function(req, res){
    Campground.find({}, function (err, allCampgrounds) {
        if(err){
            console.log(err);
        }else{
            res.render('index', {campgrounds:allCampgrounds})
        }

    });
    //res.render("campgrounds", {campgrounds:campgrounds});
});
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
