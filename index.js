const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;


// middleware
app.use(express.json());
app.use(cors());




const uri = "mongodb+srv://ReactToDoApp:dEOWmcSAZOPgSlUj@cluster0.t3cv0.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const run = async() => {
    try{

        await client.connect();
        console.log('DB Connected');



    }
    finally{

    }
}

run().catch(console.dir);



app.get('/', (req, res) => {
    res.send("Running React ToDo App Server");
});

app.listen(port, () => {
    console.log("Listen to Port", port);
});