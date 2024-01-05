import bodyParser from "body-parser";
import express from "express";

const app = express();
var i = -1;
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

var blogs = [];

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/blogs", (req, res) => {
  res.render("blogs.ejs");
});

app.get("/write", (req, res) => {
  res.render("write.ejs");
});

app.post("/blogs", (req, res) => {
  if (i === -1) {
    blogs.push(req.body["inputBlog"]);
    res.render("blogs.ejs", { blogArray: blogs });
  } else {
    blogs[i] = req.body["inputBlog"];
    res.render("blogs.ejs", { blogArray: blogs });
  }
});

app.get("/edit/:id", (req, res) => {
  i = req.params.id;
  res.render("edit.ejs", { editBlog: blogs[i] });
});

app.get("/blog/:id", (req, res) => {
  let d = req.params.id;
  blogs.splice(d, 1);
  res.render("blogs.ejs", { blogArray: blogs });
});

app.listen(3000, () => {
  console.log("Server listening at port 3000");
});
