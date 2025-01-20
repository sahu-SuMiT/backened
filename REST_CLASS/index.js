const express = require("express"); 
const path = require("path");
const app = express();
const port = 8080;
const { v4 : uuidv4 } = require("uuid");
//uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
const methodOverride = require("method-override");
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,"views"));//set views as ejs templates folder, path.join=> connects this directory with the linked directory
app.use(express.static(path.join(__dirname,"public")));

let posts = [
    {   
        id: uuidv4(),
        username:"apna college",
        content:"I love coding",
    },
    {
        id:uuidv4(),
        username:"shraddhakhapra",
        content:"Hardwork is important to achieve success",
    },
    {
        id:uuidv4(),
        username:"rahulkumar",
        content:"I got selected in my 1st internship",
    },
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})
app.post("/posts",(req,res)=>{
    console.log(req.body);
    let {username,content} = req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
});
app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> (id === p.id));//let post = posts.find((p)=>{return id === p.id;});
    console.log(post);
    res.render("show.ejs",{post});
})
app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=>(p.id == id));
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
    
})
app.get("/posts/:id/edit",(req,res)=>{
    let { id } = req.params;
    let post = posts.find((p)=>(p.id === id));
    console.log(post);
    res.render("edit.ejs",{post});
})
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts = posts.filter((p)=>(p.id!==id));
    res.redirect("/posts");
})

app.listen(port,()=>{
    console.log(`app is listening to port ${port}`);
})