const mongoose = require("mongoose");

main()
.then(()=>{
    console.log("connection successful");
})
.catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
}
const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    autor:{
        type: String
    },
    price:{
        type: Number
    },//true syntax
});

const Book = mongoose.model("Book", bookSchema);
