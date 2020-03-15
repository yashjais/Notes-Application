const mongoose = require('mongoose')

// const setUpDb = () => {
//     mongoose.connect('mongodb://localhost:27017/notes-redux',  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify : false, useCreateIndex: true })
//         .then(res => {
//             console.log('connected to db')
//         })
//         .catch(err => {
//             console.log(err)
//         })
// }

const setUpDb = () => {
    mongoose.connect('mongodb+srv://yashjais:Pengu123@cluster0-y98vr.mongodb.net/test?retryWrites=true&w=majority',  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify : false, useCreateIndex: true })
        .then(res => {
            console.log('connected to db')
        })
        .catch(err => {
            console.log(err)
        })
}


module.exports = setUpDb   


/*
// mongodb+srv://mongoDbUser:<password>@notes-5v9tu.gcp.mongodb.net/test?retryWrites=true&w=majority
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://mongoDbUser:<password>@notes-5v9tu.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
*/
// hello