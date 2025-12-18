import express from "express";
import cors from "cors";
import User from "./models/User.js";
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

const seedUser = async () => {
    try {
        const exists = await User.findOne({ username: "sanjayn29" });
        if (!exists) {
            const hashedPassword = await bcrypt.hash("N.Sanjay@2005", 10);
            await User.create({
                username: "sanjayn29",
                password: hashedPassword,
                name: "Sanjay",
                age: 20
            });
            console.log("Default user created: sanjayn29");
        }
    } catch (err) {
        console.error("Error seeding user:", err);
    }
};
seedUser();

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

        const token = jwt.sign({ id: user._id, username: user.username }, SECRET_KEY, { expiresIn: "1h" });

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
        const { name, age } = req.body;
        // Auto-generate credentials for basic CRUD usage
        const username = name.toLowerCase().replace(/\s/g, '') + Math.floor(Math.random() * 10000);
        const password = await bcrypt.hash("123456", 10);

        const newUser = await User.create({ name, age, username, password });
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

export default app;
