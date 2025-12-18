import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    email: { type: String, required: true }, // Mapped to user email
    task: { type: String, required: true },
    status: { type: String, default: 'Pending' }, // Pending, In Progress, Done
    priority: { type: String, default: 'Medium' }, // Low, Medium, High
    dueDate: { type: Date },
    notes: { type: String }
});

const Todo = mongoose.model('Todo', todoSchema);
export default Todo;
