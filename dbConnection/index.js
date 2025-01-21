const { faker } = require('@faker-js/faker');
// Get the client
const mysql = require('mysql2');
const express = require('express');
const app = express();
// Create the connection to database(node <--> database)
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password: '@Sumit13'
});
// let q = "INSERT INTO user (id, username, email, password) VALUES (?, ?, ?, ?)";
// let user = ["123","123_newuser","abc@gmail.com","abc"];
let getRandomUser = () => {
    return [
      faker.string.uuid(),
      faker.internet.username(), // before version 9.1.0, use userName()
      faker.internet.email(),
      faker.internet.password(),
      ];
  }
let q = "INSERT INTO user (id, username, email, password) VALUES ?";
let data = [];
for(let i = 1; i <=100; i++){
    data.push(getRandomUser()); //100 fake users
}
// try{ 
//     connection.query(q,[data], (err,result) =>{
//         if(err) throw err; 
//         console.log(result);
//         console.log(result.length);
//     })
// }catch(err){
//     console.log(err);
// }
// connection.end();//to end connection with database

app.get("/",(req,res)=>{
    res.send("Welcome to the home page");
});
app.listen("8080",()=>{
    console.log("app is listening to 8080");
})

//console.log(createRandomUser());
