const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Todo = require('./model/todo');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://sanju:Abc1234@cluster0.g9obo.mongodb.net/tododb?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/todos', async (req, res) => {
    const { description, status } = req.body;
    const todo = new Todo({ description, status });
    await todo.save();
    res.status(201).json(todo);
});

app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

app.put('/todos/:id', async (req, res) => {
    const { status } = req.body;
    const todo = await Todo.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(todo);
});

app.delete('/todos/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

app.listen(5000, () => console.log('Server running on port 5000'));






