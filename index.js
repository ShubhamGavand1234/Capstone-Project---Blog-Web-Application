import express from "express";
import bodyParser from "body-parser";

// import fs from "fs";
const app = express();
const port = 3000;
var id = 0;
var PostArray = [];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/create", (req, res) => {
  res.render("create.ejs");
});

app.post("/create", (req, res) => {
  id++;
  var newPost = {
    id: id.toString(),
    title: req.body["title"],
    author: req.body["author"],
    description: req.body["description"],
  };
  PostArray.push(newPost);
  // counter++;
  // var filePath = `Blogs/Blog_${counter}.txt`;
  // fs.writeFile(filePath, data, (err) => {
  //   if (err) {
  //     console.error("Error writing to file", err);
  //     return res.status(500).send("Internal Server Error");
  //   }
  // });
  // res.send("<a href='/home'>Go home</a>");
  res.redirect("/home");
  console.log(PostArray);
});

app.get("/home", (req, res) => {
  res.render("home.ejs", { PostArry: PostArray });
});

app.get("/post/:id", (req, res) => {
  // const postId = parseInt(req.params.id);
  const postId = req.params.id;

  const post = PostArray.find((p) => p.id === postId);
  console.log(post);
  if (post) {
    res.render("singlePost", { singlePost: post });
  } else {
    res.status(404).send("Post not found");
  }
});

app.patch("/edit/:id", (req, res) => {
  const postID = req.params.id;
  console.log(postID);
  res.sendStatus(200);
});

app.delete("/delete/:id", (req, res) => {
  const deleteID = req.params.id;

  const index = PostArray.findIndex((post) => post.id === deleteID);

  console.log(req.params.id, index, PostArray[index]);

  if (index !== -1) {
    PostArray.splice(index, 1);
    res.json({ success: true });
  } else {
    res.status(404).json({ success: false, message: "Item not found" });
  }
});

app.listen(port, () => {
  console.log(`Application nrunning on port ${port}`);
});
