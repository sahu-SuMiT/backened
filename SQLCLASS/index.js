const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const path = require("path");
const methodOverride = require('method-override');
app.use(methodOverride('_method'))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"/views"));
app.use(express.urlencoded({extended:true}));

// Create the connection to database(node <--> database)
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password: '@Sumit13'
});

let getRandomUser = () => {
    return [
      faker.string.uuid(),
      faker.internet.username(), // before version 9.1.0, use userName()
      faker.internet.email(),
      faker.internet.password(),
      ];
  }

let data;
// for(let i = 1; i <=100; i++){
//     data.push(getRandomUser()); //100 fake users
// }


app.get("/",(req,res)=>{
    let q = "SELECT count(*) from user";
    try{
        connection.query(q,(err,result)=>{
            if(err) throw err;
            let count = result[0]["count(*)"];
            res.render("home.ejs",{count});
            
        })
    }catch(err){
        console.log(err);
        res.send("Some error in database")
    }
   
});
app.get("/user",(req,res)=>{
    let q = `Select * from user`;
    try{
        connection.query(q,(err,result)=>{
            if(err) throw err;
            let users = result;
            data = result;
            res.render("showusers.ejs",{users});
        })
    }catch(err){
        console.log(err);
        res.send("some error in database");
    }
})
app.get("/user/:id/edit",(req,res)=>{
    let {id} = req.params;
    let q = `Select * from user WHERE id='${id}'`;
    try{
        connection.query(q,(err,result)=>{
            if(err) throw err;
            let user = result[0];
            res.render("edit.ejs",{user});
        })
    }catch(err){
        console.log(err);
        res.send("error while fetching data");
    }

})
app.patch("/user/:id",(req,res)=>{
    let {id} = req.params;
    let {password : formPass, username: newUsername} = req.body;
    let q = `Select * from user WHERE id='${id}'`;
    try{
        connection.query(q,(err,result)=>{
            if(err) throw err;
            console.log(result);
            let user = result[0];
            if(user.password != formPass){
                res.send("incorrect password");
            }else{
                let q2 = `UPDATE user SET username='${newUsername}' WHERE id='${id}'`;
                try{
                    connection.query(q2,(err,result)=>{
                        if(err) throw err;
                        res.send("successful");
                    })
                }catch(err){
                    console.log(err);
                    res.send("error while fetching data");
                }
            }
                
        })
    }catch(err){
        console.log(err);
        res.send("error while fetching data");
    }
})
app.listen("8080",()=>{
    console.log("server is listening to 8080");
})
// post and delte 
app.get("/user/new",(req,res)=>{
    res.render("new.ejs");
})
app.post("/user/new",(req,res)=>{
    console.log(req.body);
    let q = `INSERT INTO user (id,username,email,password) VALUES('${faker.string.uuid()}','${req.body.username}','${req.body.email}','${req.body.password}')`;
    try{
        connection.query(q,(err,result)=>{
            if(err) throw err;
            res.redirect("/user");
        })
    }catch(err){
        console.log(err);
        res.send("Cannot create new username, error occured");
    }
    
})
app.delete("/user/:id/delete",(req,res)=>{
    let {id} = req.params;
    let q = `Delete from user where id='${id}'`;
    try{
        connection.query(q,(err,result)=>{
            if(err) throw err;
            console.log(result);
            res.redirect("/user");
        })
    }catch(err){
        console.log(err);
        res.send("error while deleting data");
    }

})


//let q = "INSERT INTO user (id, username, email, password) VALUES ?";
// try{ 
//     connection.query(q,[data], (err,result) =>{
//         if(err) throw err; 
//         console.log(result);
//         console.log(result.length);
//     })
// }catch(err){
//     console.log(err);
// }
// connection.end();