const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        
        const todosCollection = client.db("ReactToDoApp").collection("Todos");

        

        // Post Todos
        app.post('/todos', async(req, res) => {
            const todo = req.body;
            const result = await todosCollection.insertOne(todo);
            res.send(result);
        })

        // Get Todos
        app.get('/todos', async(req, res) => {
            const query = {};
            const todos = todosCollection.find(query);
            const result = await todos.toArray();
            res.send(result);
        })

        // Update Todos
        app.put('/todo/:id', async(req, res) => {
            const id = req.params.id;
            const filter = {_id: ObjectId(id)};
            const options = {upsert: true};
            const UpdateDoc = {
                $set: {role: 'completed'}
            }
            const result = await todosCollection.updateOne(filter, UpdateDoc, options);
            res.send(result);
        })

        // get Completed Todos
        app.get('/completed', async(req, res) => {
            const query = {role: 'completed'};
            const todos = todosCollection.find(query);
            const result = await todos.toArray();
            res.send(result); 
        })

        // Delete Todos
        app.delete('/todo/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await todosCollection.deleteOne(query);
            res.send(result);
        })

        // Get todo by id
        app.get('/todo/:id', async (req, res) => {
            const id = req.params.id;
            const filter = {_id: ObjectId(id)};
            const result = await todosCollection.findOne(filter);
            res.send(result);
        })

        // update todo by id
        app.patch('/todo/:id', async (req, res) => {
            const id = req.params.id;
            const data = req.body;
            const filter = {_id: ObjectId(id)};
            const options = {upsert: true};
            const updatedDoc = {
               $set: data
            };
            const updatedData = await todosCollection.updateOne(filter, updatedDoc, options);
            res.send(updatedData);
        })





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