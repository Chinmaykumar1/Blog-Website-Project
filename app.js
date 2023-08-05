const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const app = express();

var post = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));

const homeStartingContent = "Welcome to our blog, your one-stop destination for thought-provoking articles, insightful stories, and exciting discussions. We are passionate about sharing valuable information and engaging content on a wide range of topics, from technology and science to travel and lifestyle.";

const aboutContent = "At our Blog, we cover a diverse array of subjects, from technology and science to travel, food, health, and more. Our team of experts is dedicated to delivering well-researched articles that cater to the interests and curiosities of our readers.";

const contactContent = "We invite you to join us on this exciting journey of discovery, learning, and inspiration. Whether you're an avid reader or a fellow blogger, we encourage you to explore our diverse content and be a part of our growing community.";

let posts= [];

app.get("/", function(req, res){
    res.render("home",{HomeContent:homeStartingContent,
    posts:posts});
})

app.get("/about",function(req,res){
    res.render("about",{aboutContent:aboutContent});
});

app.get("/contact",function(req,res){
    res.render("contact",{contactContent:contactContent});
});

app.get("/blog",function(req,res){
    res.render("compose");
    
});

app.get("/posts/:title",function(req,res){
    const requestedTitle =_.lowerCase(req.params.title);

    posts.forEach(function(post){
       const storedtitle = _.lowerCase(post.title);
    if(requestedTitle===storedtitle){
      res.render("post.ejs",{
       title : post.title,
       content : post.content 
      })
       };

       })
    }
);
app.post("/blog",function(req,res){
   
    const post ={
        title : req.body.post,
        content : req.body.userInput
    };

    posts.push(post);
    res.redirect("/");


    
    
   
    
    
});
// app.post("/compose",function(req,res){
//     res.render()
//     console.log(req.body.postTitle);
// })




app.listen(3000,function(){
    console.log("Server started on port 3000");
})