const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema.js');
const mongoose = require('mongoose');
const cors = require('cors');

//test comment

const port = 4000;
const app = express();
const username = process.env.USERNAME;
const key = process.env.KEY;

//Allow cross origin requests
app.use(cors());

//connect to DB
DB = `mongodb+srv://${username}:${key}@graphql-project-reyfb.mongodb.net/test?retryWrites=true&w=majority`;
mongoose.connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});
mongoose.connection.once("open", ()=> {
    console.log("Connected to Database");
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
});