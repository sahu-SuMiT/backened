const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(()=>{
        console.log("Connected to DB");
    })
    .catch((err)=>{
        console.log(err);
        console.log("Cannot connect to db");
    })
async function main(){
    await mongoose.connect(MONGO_URL);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.send("root route");
})

app.get("/listings",async (req,res)=>{
    const allListings = await Listing.find({})
    res.render("listings/index.ejs",{allListings})
})
//new route
app.get("/listings/new",(req,res)=>{
    console.log("request recieved");
    res.render("listings/new.ejs");
})
//id route
app.get("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
})
//Create route
app.post("/listings",async (req,res)=>{
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
})
//Edit Route
app.get("/listings/:id/edit",async (req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
})
app.put("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing}); //...spreading operator
    res.redirect(`/listings/${id}`);
})
//Delete Route
app.delete("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
})
app.listen(8080,()=>{
    console.log("Server is running on 8080");
});