import mongoose from "mongoose";
const { Schema } = require('mongoose');

const userSchema = new Schema({
    name: { type: String, required: true },
    // password: {  }
    schools: [{ type: mongoose.Types.ObjectId, ref: 'School' }],
});

const schoolSchema = new Schema({
    key: { type: String, required: true },      // user_school (emily_ucb) OR user schema
    name: { type: String, required: true },     // School name (UCB)
    deadline: { type: String, required: true },
    todos: [{ type: mongoose.Types.ObjectId, ref: 'Todo' }],
});

const todoSchema = new Schema({
    key: { type: String, required: true },
    task: { type: String, required: true },     // SOP
    deadline: { type: String, required: true },
    comment: { type: String, required: false },
    checkpoints: [{ type: mongoose.Types.ObjectId, ref: 'Checkpoint' }], // mongoose schema does not support json type
})

const checkpointSchema = new Schema({
    key: { type: String, required: true },
    content: { type: String, required: true },
    time: { type: String, required: true },
})

const UserModel = mongoose.model('User', userSchema);
const SchoolModel = mongoose.model('School', schoolSchema);
const TodoModel = mongoose.model('Todo', todoSchema);
const CheckpointModel = mongoose.model('Checkpoint', checkpointSchema);

const db = {
    UserModel,
    SchoolModel,
    TodoModel,
    CheckpointModel
};

export { db as default };