const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");


app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

main()
.then(()=>{
    console.log("connection to db successfull");
})
.catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}



app.get("/chats/",async (req,res)=>{
    let chats = await Chat.find();
    //console.log(chats);
    //res.send("working");
    res.render("index.ejs",{chats});
})
//New Route
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
})
//Create Route
app.get("/chats/:id/edit",async (req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs",{chat});
    
    //res.render("edit.ejs",{req.params});
    //res.send(`Edit req recieved at id ${req.params.id}`);
})
app.post("/chats",(req,res)=>{
    let {from, to, msg} = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date()
    }) 
    newChat.save().then((res)=>{console.log(res,"chat was saved")}).catch((err)=>{console.log(err)})    
    res.redirect("/chats");
})
//UPDATE Route
app.put("/chats/:id",async (req,res)=>{
    let {id} = req.params;
    let {msg : newMsg} = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(
        id,
        {msg: newMsg},
        {runValidators:true, new: false}
    );
    console.log(updatedChat);
    res.redirect("/chats");
})
//DELETE Route
let flag = 0;
app.delete("/chats/:id",async (req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("delete_confirm.ejs",{chat});
    // let deletedChat = await Chat.findByIdAndDelete(id);
    // console.log(deletedChat);
    // res.redirect("/chats");
})
app.delete("/chats/:id/delete_yes",async (req,res)=>{
    let {id} = req.params;
    let delChat = await Chat.findByIdAndDelete(id);
    console.log(delChat);
    res.redirect("/chats");
    // alert('Chat deleted');
})
app.get("/",(req,res)=>{
    res.send("root is working");
})

app.listen(8080,()=>{
    console.log(`server is listening on 8080`);
})
