const { promises } = require('dns')
const Task = require('../models/tasks')
const User = require('../models/users')

const ShowTask = async (req, res) => {
  const task = await Task.findById(req.params.id)
    .populate('members.member')
    .populate('superTask')
    .populate('assignedBy')
  // //console.log(task.creator._id,req.user._id);
  // //console.log(task.members);
  ////console.log(task.creator,req.user._id);
  if (!task.creator.equals(req.user._id) && task.superTask == null) {
    return res.status(400).send('SuperTask does not exist')
  }

  ////console.log(task.members);
  const members = task.members.map((object) => {
    return {
      username: object.member.username,
      profilePic: object.member.profilePic,
    }
  })

  
  //console.log(members);
  const data = {
    title: task.title,
    description: task.description,
    progress: task.progress,
    completed: task.completed,
    members: members,
    creator: User.findById(task.creator._id).username,
    superTask: task.superTask,
    deadline: task.deadline,
    id: task._id,
  }
  if(task.assignedBy){
    data.assignedBy = task.assignedBy.username
  }

  return res.status(200).json(data)
}

const AddTask = async (req, res) => {
  ////console.log(req.user);

  const { title, description, deadline } = req.body

  const task = new Task({
    title,
    description,
    creator: req.user._id,
    progress: 0,
    completed: false,
    assignedBy: null,
    deadline,
    subTasks: [],
    superTask: null,
  })

  await task.save()

  const u = await User.findById(req.user._id)
  // ////console.log(u);
  u.tasks.push(task._id)
  await u.save()
  task.members.push({ member: req.user._id, completed: false })
  await task.save()

  res.status(201).send('Task Created')
}

const AddMemeber = async (req, res) => {
  ////console.log(req.body);

  const { username, title, description, deadline } = req.body
  const task = await Task.findById(req.params.id);
  const mem = await User.findOne({ username })

    if(!mem){
        return res.status(400).send('Member does not exist')
    }

  if (task.members.includes((object) => object.member.equals(mem._id))) {
    return res.status(400).send('Member already exists')
  }

  //////console.log(mem._id);
  console.log(task.members[0].member._id);

  const task2 = new Task({
    title,
    description,
    creator: req.user._id,
    progress: 0,
    completed: false,
    assignedBy: task.members[0].member._id,
    superTask: task._id,
    deadline,
    subTasks: [],
  })
  ////console.log('came here');

  await task2.save()
  const completedMembers = (task.progress / 100) * task.members.length
  task.subTasks.push({ task: task2._id, member: mem._id })
  //////console.log(task.members);
  await task.save()
  task.members.push({ member: mem._id, completed: false })
  await task.save()

  task.progress = (completedMembers / task.members.length) * 100
  await task.save()

  mem.tasks.push(task2._id)
  //////console.log(mem.tasks);
  await mem.save()
  task2.members.push({ member: mem._id, completed: false })
  await task2.save()

  return res.status(201).send('Member Added')
}

const UpdateTask = async (req, res) => {
  // ////console.log('hello');
  ////console.log(req.body);

  const { status } = req.body
  const task = await Task.findById(req.params.id).populate('members.0.member')
  const user = await User.findById(req.user._id)
  const superTask = await Task.findById(task.superTask)

  /*const n = task.members.length;
    const members = task.members;
    const creator = task.creator;*/
  ////console.log(task);

  if (!user.tasks.includes(task._id)) {
    res.status(400).send('Task does not exist')
  }
  ////console.log(task);
  if (
    task.members.filter((object) => object.member._id.equals(req.user._id))[0]
      .completed === true
  ) {
    return res.status(400).send('Task already completed')
  }

  task.members.filter((object) =>
    object.member._id.equals(req.user._id)
  )[0].completed = true
  await task.save()

  if (task.subTasks.length === 0) {
    if (status === 'completed') {
      task.progress = 100
    }
  } else {
    if (status === 'completed') {
      task.progress += 100 / (task.subTasks.length + 1)
    }
  }

  if (task.progress >= 99.9999) {
    task.completed = true
  }

  await task.save()

  //user.tasks.pull(task._id);
  // await user.save();

  if (superTask != null) {
    superTask.progress += 100 / (superTask.subTasks.length + 1)
    if (superTask.progress >= 99.9999) {
      superTask.completed = true
    }
    await superTask.save()
  }

  // //console.log('came here');

  ////console.log(task.progress);

  res.status(200).json(task.progress)
}

const ShowAllTasks = async (req, res) => {
  const user = await User.findById(req.user._id)
    .populate('tasks')
    .populate({
      path: 'tasks',
      populate: {
        path: 'subTasks',
        populate: {
          path: 'member',
          model: 'User',
        },
      },
    })

  const tasks = user.tasks
  ////console.log(tasks);
  //////console.log(tasks.map(object => object.subTasks.map(object => object.member)));

  const data = tasks.map((object) => {
    return {
      title: object.title,
      description: object.description,
      progress: object.progress,
      completed: object.completed,
      deadline: object.deadline,
      id: object._id,
      profilePics: object.subTasks.map((object) => object.member.profilePic),
    }
  })

  res.status(200).json(data)
}

const DeleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id).populate('members.member')
  //const subTasks =        await     task.subTasks[0].populate('task');

  ////console.log(task.members);

  await Promise.all(
    task.members.map(async (object) => {
      await object.member.tasks.pull(task._id)
      await object.member.save()
    })
  )

  await Task.findOneAndDelete({ _id: req.params.id })

  return res.status(200).send('Task Deleted')
}

module.exports = {
  ShowTask,
  AddTask,
  AddMemeber,
  UpdateTask,
  ShowAllTasks,
  DeleteTask,
}
