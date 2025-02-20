const Task = require("../models/TaskModel");

//add a new task
exports.createTask = async(req, res) => {
    const { title, description, dueDate, priority } = req.body;
    try{
        console.log("request body:", req.body);

        if(!req.body){
            return res.status(404).json({ message: "All the fields required" });
        }
        
        const currentDate = new Date();
        if (new Date(dueDate) < currentDate) {
            return res.status(400).json({ message: "Due date cannot be in the past" });
        }

        const task = await Task.create({
          user: req.user._id,
          title,
          description,
          dueDate,
          priority,
        });

        res.status(201).json({message: "New Task Created", task})
    }catch(error){
        res.status(500).json({error: error.message || "Failed to create a product"});
    }
}


//get task by id
exports.getTask = async (req, res) => {
  try {
    console.log("Decoded User Object:", req.user);
    if (!req.user) {
      return res.status(403).json({ message: "User not authenticated" });
    }

    const tasks = await Task.find({ user: req.user._id });
    console.log("Fetched Tasks:", tasks);

    res.status(200).json({ message: "Fetched task by user id", tasks });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || "Failed to fetch task by user id" });
  }
};


//update task
exports.updateTask = async (req, res) => {
    const { id } = req.params;
    try {
        const currentDate = new Date();
        if (req.body.dueDate && new Date(req.body.dueDate) < currentDate) {
            return res.status(400).json({ message: "Due date cannot be in the past" });
        }

        const task = await Task.findByIdAndUpdate(
            id,
            req.body,
            {new: true}
        );
        if(!task){
            return res.status(404).json({message: "Task not found"});
        }
        res.status(200).json({message: "Task updated successfully", task})
    } catch (error) {
        res.status(500).json({error: error.message || "Failed to update task"})
    }
}

//delete a task
exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findByIdAndDelete(id);

        if(!task){
            return res.status(404).json({ message: "Task not found"})
        }
        res.status(200).json({message: "Task deleted successfully"})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}