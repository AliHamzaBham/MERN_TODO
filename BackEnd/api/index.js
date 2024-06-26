const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const express = require('express');
const { createSecretKey } = require('crypto');
const app = express();

app.use(express.json())
app.use(cors({
   origin: ["https://mern-todo-frontend-six.vercel.app"],
   methods: ["POST", "GET", "PUT", "DELETE"],
   credentials: true
}))

dotenv.config();


const dev_db_url = "mongodb+srv://vercel-admin-user:vercelpassword@cluster01.njpdmew.mongodb.net/TodoApp?retryWrites=true&w=majority&appName=Cluster01"
// const PORT = process.env.PORT || 80
const MONGOURL = process.env.MONGOURL || dev_db_url 

mongoose.connect(MONGOURL) 

const taskSchema = new mongoose.Schema({
    title: String,
    date: String,
    completed: Boolean
})

const TaskModel = mongoose.model("todos", taskSchema)

app.get('/', (req, res) => {
    res.json({message: "Welcome"})
})

app.get('/gettasks', (req, res) => {
    TaskModel.find().
    then((users) => {
        res.json(users.reverse())
    })
    .catch((err) => console.log(err))
})

app.post('/addtask', async (req, res) => {
    const newTask = req.body
    const addedUser = await TaskModel.create({...newTask, completed: false})
    res.json(addedUser)
})

app.delete('/deletetask/:id', async (req, res) => {
    await TaskModel.deleteOne({_id: req.params.id})
    .then(() => {
        res.status(200).json({message: "Task Deleted"})
    })
    .catch((err) => res.status(400).json({message: "Something went wrong"}))
})

app.put('/completetask/:id', async (req, res) => {
    let completedValue;
    await TaskModel.findOne({_id: req.params.id})
    .then((task) => {
        completedValue = !task.completed
    })
    .catch(err => console.log(err))

    await TaskModel.updateOne({_id: req.params.id}, {"completed": completedValue})
    .then((task) => res.json("task updated successfully"))
    .catch((err) => res.json(err))
})

app.listen();
module.exports = app;
