const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let tasks = [];
const validPriorities = ["low", "medium", "high"];

// Create a new task
app.post("/tasks", (req, res) => {
    const { title, description, completed, priority } = req.body;

    if (!title || title.trim() === "") {
        return res.status(400).json({ message: "Title is required" });
    }

    if (priority && !validPriorities.includes(priority)) {
        return res.status(400).json({ message: "Priority must be 'low', 'medium', or 'high'" });
    }

    const newTask = {
        id: tasks.length + 1,
        title,
        description: description || "",
        completed: completed || false,
        priority: priority || "medium",
        createdAt: new Date().toISOString()
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Get all tasks with optional filtering and sorting
app.get("/tasks", (req, res) => {
    let filteredTasks = tasks;

    if (req.query.completed) {
        const isCompleted = req.query.completed === "true";
        filteredTasks = filteredTasks.filter(task => task.completed === isCompleted);
    }

    if (req.query.sort === "createdAt") {
        filteredTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    res.json(filteredTasks);
});

// Get a specific task by ID
app.get("/tasks/:id", (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
});

// Update a task by ID
app.put("/tasks/:id", (req, res) => {
    const { title, description, completed, priority } = req.body;
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));

    if (taskIndex === -1) {
        return res.status(404).json({ message: "Task not found" });
    }

    if (priority && !validPriorities.includes(priority)) {
        return res.status(400).json({ message: "Priority must be 'low', 'medium', or 'high'" });
    }

    tasks[taskIndex] = {
        ...tasks[taskIndex],
        title: title || tasks[taskIndex].title,
        description: description || tasks[taskIndex].description,
        completed: completed !== undefined ? completed : tasks[taskIndex].completed,
        priority: priority || tasks[taskIndex].priority,
    };

    res.json(tasks[taskIndex]);
});

// Delete a task by ID
app.delete("/tasks/:id", (req, res) => {
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));

    if (taskIndex === -1) {
        return res.status(404).json({ message: "Task not found" });
    }

    tasks.splice(taskIndex, 1);
    res.status(204).send();
});

// Get tasks by priority
app.get("/tasks/priority/:level", (req, res) => {
    const level = req.params.level.toLowerCase();

    if (!validPriorities.includes(level)) {
        return res.status(400).json({ message: "Invalid priority level" });
    }

    const filteredTasks = tasks.filter(task => task.priority === level);
    res.json(filteredTasks);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
