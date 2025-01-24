const mongoose = require("mongoose");

main().then(()=>{
    console.log("Connection successful");
})
.catch((err)=>{console.log(err)});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
}


const userSchema = new mongoose.Schema({
    name:String,
    email: String,
    age: Number,
})
//model name usually kept same as collection name
const User = mongoose.model("User",userSchema);
// const user2 = new User({
//     name:"Eve",
//     email:"eve@yahoo.in",
//     age:48,
// });
// user2.save().then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// })

// User.insertMany([
//     {name:"Tony", email:"tony@gmail.com",age:50},
//     {name:"Peter", email:"peter@gmail.com",age:30},
//     {name:"Bruce", email:"bruce@gmail.com",age:47}
// ])
// .then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// })

//find , findOne
// User.findById("67925793f8f841a084ed9c2b") //returns a thenable query NOT a promise
// .then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// })

//User.updateMany
// User.updateOne({name:"Bruce"},{age:49})
// .then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// })

// User.findOneAndUpdate({name:"Bruce"},{age:45},{new:true})
// .then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// })

User.deleteOne({name:"Bruce"})
.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err);
})

//findByIdAndDelete
//findOneAndUpdate
