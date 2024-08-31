const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'my-todo-db';

app.use(express.json());

MongoClient.connect(url, function(err, client) {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to MongoDB');
    const db = client.db(dbName);
    const todosCollection = db.collection('todos');

    app.get('/api/todos', (req, res) => {
        const limit = req.query.limit || 10;
        const skip = req.query.skip || 0;
        todosCollection.find().skip(skip).limit(limit).toArray((err, todos) => {
          if (err) {
            console.log(err);
            res.status(500).send({ message: 'Error fetching todos' });
          } else {
            res.send(todos);
          }
        });
      });

    app.post('/api/todos', (req, res) => {
      const todo = req.body;
      todosCollection.insertOne(todo, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send({ message: 'Error creating todo' });
        } else {
          res.send(result.ops[0]);
        }
      });
    });

    app.patch('/api/todos/:id', (req, res) => {
      const id = req.params.id;
      const updates = req.body;
      todosCollection.updateOne({ _id: id }, { $set: updates }, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send({ message: 'Error updating todo' });
        } else {
          res.send(result);
        }
      });
    });
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});