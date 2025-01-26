show dbs
use college
show collections
db.student.insertOne({name:adam,age:19,marks:97})
db.student.insertMany() 
db.student.find({marks:{$eq:75}})
db.student.find(); //returns an array
db.student.findOne()//returns a document
db.student.replaceOne();
db.student.updateOne()
db.student.updateMany()

$and $not $nor $or
{ $and: [ { <expression1> }, { <expression2> } , ... , { <expressionN> } ] }

db.student.find({$and:[{marks:{$gte:75}},{city:"Delhi"}]})
db.student.find({marks:{$not:{$eq:75}}})


delteOne()
deleteMany
