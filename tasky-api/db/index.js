import express from 'express';
import Task from './taskModel';

const router = express.Router(); // eslint-disable-line

// Get all tasks
router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.status(200).json(tasks);
});

// create a task
router.post('/', async (req, res) => {
    const task = await Task(req.body).save();
    res.status(201).json(task);
});
export default router;