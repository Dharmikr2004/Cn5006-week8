const mongoose = require('mongoose');
const MONGO_URI = 'mongodb://localhost:27017/Week8';

mongoose.connect(MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', function(err) {
    console.log("Error occurred during connection" + err);
});

db.once('connected', function() {
    console.log(`Connected to ${MONGO_URI}`);
});

const PersonSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: Number,
    Gender: String,
    Salary: Number
});

const person_doc = mongoose.model('modelname', PersonSchema, 'personCollection');

const doc1 = new person_doc({ name: 'Jacky', age: 36, Gender: "Male", Salary: 3456 });

doc1.save().then((doc1) => {
    console.log("New Article Has been Added Into Your Database.", doc1);
}).catch((err) => {
    console.error(err);
});

const manyPersons = [
    { name: 'Simon', age: 42, Gender: "Male", Salary: 3456 },
    { name: 'Neesha', age: 23, Gender: "Female", Salary: 1000 },
    { name: 'Mary', age: 27, Gender: "Female", Salary: 5402 },
    { name: 'Mike', age: 40, Gender: "Male", Salary: 4519 }
];

person_doc.insertMany(manyPersons).then(function() {
    console.log("Data inserted");
}).catch(function(error) {
    console.log(error);
});

person_doc.find().limit(5).then(docs => {
    console.log("Documents:", docs);
}).catch(err => {
    console.error(err);
});

person_doc.find({ Gender: "Female", age: { $gt: 25 } }).then(docs => {
    console.log("Filtered Documents:", docs);
}).catch(err => {
    console.error(err);
});

person_doc.deleteMany({ age: { $gte: 25 } }).exec().then(docs => {
    console.log('Deleted documents:', docs);
}).catch(function(error) {
    console.log(error);
});
person_doc.updateMany({ Gender: "Female" }, { Salary: 5555 }).exec().then(docs => {
    console.log("Updated records:", docs);
}).catch(function(error) {
    console.log(error);
});