import { v4 as uuidv4 } from 'uuid';
import express from 'express';
import { tasksData } from './tasksData';

const router = express.Router(); 

router.get('/', (req, res) => {
    res.json(tasksData);
});

// Get task details
router.get('/:id', (req, res) => {
    const { id } = req.params
    const task = tasksData.tasks.find(task => task.id === id);
    if (!task) {
        return res.status(404).json({ status: 404, message: 'Task not found' });
    }
    return res.status(200).json(task);
});

//Update an existing task
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const taskIndex = tasksData.tasks.findIndex(task => task.id === id); 
    if (taskIndex === -1) {
        return res.status(404).json({ status: 404, message: 'Task not found' });
    }
    const updatedAt = new Date().toISOString(); // Get current date and time in ISO format
    const updatedTask = { ...tasksData.tasks[taskIndex], ...req.body, id, updated_at: updatedAt }; // Update updated_at property
    tasksData.tasks[taskIndex] = updatedTask;
    res.json(updatedTask);
});

//Delete a task
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const taskIndex = tasksData.tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) return res.status(404).json({status:404,message:'Task not found'});
    tasksData.tasks.splice(taskIndex, 1);
    res.status(204).send();
    tasksData.total_results--;
});


//Add a task
router.post('/', (req, res) => {
    const { title, description, deadline, priority, done } = req.body;
    const createdAt = new Date().toISOString(); // Get current date and time in ISO format
    const newTask = {
        id: uuidv4(),
        title,
        description,
        deadline,
        priority,
        done,
        created_at: createdAt, // Add created_at property
        updated_at: createdAt  // Set updated_at to the same value as created_at initially
    };
    tasksData.tasks.push(newTask);
    res.status(201).json(newTask);
    tasksData.total_results++;
});

export default router;