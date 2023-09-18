const tasks = require('../models/tasks');
const user = require('../models/users');


const createTask = async (req, res) => {
    const { title, descriptions, members } = req.body;

    const task = new tasks({
        title,
        descriptions,
        members,
        creator: req.user._id,
        assingedBy: req.user._id
    })
    await task.save();
    res.status(201).send('Task created');
}