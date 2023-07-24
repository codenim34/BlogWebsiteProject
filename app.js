//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");

const homeStartingContent =
  "Discover, Engage, and Explore the World of Ideas. Are you passionate about staying informed, seeking inspiration, and indulging in thought-provoking content? Look no further! Our blog website is your one-stop destination for a diverse array of articles, musings, and stories that cater to every curious mind.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

var posts = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/blogDB", {useNewUrlParser: true});

const postSchema = new mongoose.Schema({
  title: String,
  content: String
})

const Post = mongoose.model("Post", postSchema);

// const post = new Post({
//   title: "Tasnim",
//   content:"asdfg"
// });

//post.save();
app.get("/", function (req, res) {
  // res.render("home", {
  //   startingContent: homeStartingContent,
  //   posts: posts,
  // });

  Post.find().then(function(foundPosts){
    console.log("Success");
    res.render("home",{
       startingContent: homeStartingContent,
       post: foundPosts
     });
  })
});

// app.get("/home", function (req, res) {
//   res.render("home", {
//     startingContent: homeStartingContent,
//     posts: posts,
//   });
// });

app.get("/about", function (req, res) {
  res.render("about", {
    aboutInfo: aboutContent,
  });
});
app.get("/contact", function (req, res) {
  res.render("contact", {
    contactInfo: contactContent,
  });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.get("/posts/:postID", function (req, res) {
  const requestedID= req.params.postID;
  
  Post.findOne({_id: requestedID}).then(function(){
    res.render("post",{
      title: post.title,
      message: post.content
    });
  }).catch(function(err){
    console.log(err);
  })
});

app.post("/compose", function (req, res) {
  const post =new Post( {
    title: req.body.postTitle,
    content: req.body.postBody,
  });
  // posts.push(post);  
 post.save();
 res.redirect("/");
//  console.log(post.title);
 
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
