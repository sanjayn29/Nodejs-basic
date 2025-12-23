import express from "express";
import cors from "cors";
import User from "./models/User.js";
import Todo from "./models/Todo.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

const SECRET_KEY = "my_secret_key_123";

export const seedUser = async () => {
    try {
        const hashedPassword = await bcrypt.hash("N.Sanjay@2005", 10);
        await User.findOneAndUpdate(
            { username: "sanjayn29" },
            {
                username: "sanjayn29",
                email: "sanjayn29@example.com",
                password: hashedPassword,
                name: "Sanjay",
                dob: new Date("2005-01-01")
            },
            { upsert: true, new: true }
        );
        console.log("Default user seeded/updated: sanjayn29");
    } catch (err) {
        console.error("Error seeding user:", err);
    }
};

app.post("/register", async (req, res) => {
    try {
        const { username, password, email, dob } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: "Username or Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            password: hashedPassword,
            email,
            name: username, // Default name to username
            dob // Optional
        });

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
});


app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const token = jwt.sign({ id: user._id, username: user.username, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

        res.json({ token, message: "Login successful" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// protected routes
app.get("/users", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.get("/users/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create new user
app.post("/users", async (req, res) => {
    try {
        const { name, dob } = req.body;
        // Auto-generate credentials for basic CRUD usage
        const username = name.toLowerCase().replace(/\s/g, '') + Math.floor(Math.random() * 10000);
        const password = await bcrypt.hash("123456", 10);

        const newUser = await User.create({ name, dob, username, password });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update user
app.put("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get("/dashboard", async (req, res) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        res.json({ message: 'Welcome user' });
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
});

// Delete user
app.delete("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ message: "User deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get Todos
app.get("/todos", async (req, res) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ message: "Unauthorized" });
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const todos = await Todo.find({ email: decoded.email });
        res.json(todos);
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
});

// Create Todo
app.post("/todos", async (req, res) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ message: "Unauthorized" });
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const { task, status, priority, dueDate, notes } = req.body;
        const todoData = {
            email: decoded.email,
            task, status, priority, notes
        };
        if (dueDate) todoData.dueDate = dueDate;

        const newTodo = await Todo.create(todoData);
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete Todo
app.delete("/todos/:id", async (req, res) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ message: "Unauthorized" });
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const todo = await Todo.findOneAndDelete({ _id: req.params.id, email: decoded.email });
        if (!todo) return res.status(404).json({ message: "Todo not found or unauthorized" });
        res.json({ message: "Todo deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Public endpoint to get all todos with user details (Instagram-style feed)
app.get("/all-todos", async (req, res) => {
    try {
        const todos = await Todo.find().sort({ createdAt: -1 }); // Sort by newest first
        const allTodosWithUser = [];
        for (let todo of todos) {
            const user = await User.findOne({ email: todo.email }, { name: 1, username: 1 });
            allTodosWithUser.push({
                ...todo.toObject(),
                user: user ? { name: user.name, username: user.username } : null
            });
        }
        res.json(allTodosWithUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default app;