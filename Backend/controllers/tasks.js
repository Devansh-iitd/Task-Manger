const Task = require('../models/tasks');
const User = require('../models/users'); 


const ShowTask = async(req,res) => {

    const user = await User.findById(req.user._id).populate({
        path:'tasks',
        populate:[
            {
                path:'members',
                model:'User'
            },
            {
                path:'creator',
                model:'User'
            },
            {
                path:'superTask',
                model:'Task',
               
               
            },
            {
                path:'assignedBy',
                model:'User',
               
                
            
            }
                
            
           
           
        ]
    });

    
    

   // console.log(user.tasks);

    const data = user.tasks.map(object => {

        let asb = 'None';
        let sT = 'None'

        if(object.superTask){
            sT = object.superTask.title;
        }
        
        if(object.assignedBy){
            asb= object.assignedBy.username;
        }
        

        return {
            title:object.title,
            description:object.description,
            progress:object.progress,
            completed:object.completed,
            members:object.members.map(object => object.username),
            creator:object.creator.username,
            assignedBy: asb,
            superTask: sT
        }
    });


    res.status(200).json(data);
}

const AddTask = async(req,res) => {

    //console.log(req.body);

    const {title,description,deadline} = req.body;

    /*for(let i=0;i<members.length;i++){

        let ur = User.find({username:members[i]});
        if(!ur){
            res.status(400).send('User does not exist');
        }
        else{
            members[i] = ur._id;
        }
    };*/

    
    const task = new Task({
        title,
        description,
        creator:req.user._id,
        progress:0,
        completed:false,
        assignedBy:null,
        deadline
    });

    await task.save();

    const u = await User.findById(req.user._id);
   // console.log(u);
    u.tasks.push(task._id);
    await u.save();
   /* for(let i=0;i<members.length;i++){
        let u = User.findById(members[i]);
        u.tasks.push(task._id);
        await u.save();
    }

    for(let i=0;i<members.length;i++){
        let u = User.findById(members[i]);
        u.tasks[tasks.length-1].assignedBy = req.user._id;
        await u.save();
    }*/

    res.status(201).send('Task Created');



}

const AddMemeber = async(req,res) => {

    const {username,title,description,deadline} = req.body;
    const task = await Task.findById(req.params.id);
    const mem = await User.findOne({username});
    
    //console.log(mem._id);
    
    const task2 = new Task({
        title,
        description,
        creator:req.user._id,
        progress:0,
        completed:false,
        assignedBy:task.creator,
        superTask:task._id,
        deadline
    });

     await task2.save();
    task.members.push(mem._id);
    //console.log(task.members);
    await task.save();

    mem.tasks.push(task2._id);
    //console.log(mem.tasks);
   await  mem.save();

    res.status(201).send('Member Added');

}

const UpdateTask = async(req,res) => {

    const {status} = req.body;
    const task = await Task.findById(req.params.id);
    const user = await User.findById(req.user._id);
    const superTask = await Task.findById(task.superTask);
    /*const n = task.members.length;
    const members = task.members;
    const creator = task.creator;*/
    if(!user.tasks.includes(task._id)){
        res.status(400).send('Task does not exist');
    }
    if(status === 'completed'){
       task.progress = 100;
       task.completed = true;
    }


    await task.save();

    user.tasks.pull(task._id);
    await user.save();

    if(task.superTask){
        superTask.progress += 100/superTask.members.length;
       
    }

    if(task.superTask.progress >= 99.9999){
        superTask.completed = true;
    }

    await superTask.save();


    res.status(200).send('Task Updated');
    

    
}

const ShowAllTasks = async(req,res) => {

    const user = await User.findById(req.user._id).populate('tasks');
    
    const tasks = user.tasks;
    const data = tasks.map(object => {
        return {
            title:object.title,
            description:object.description,
            progress:object.progress,
            completed:object.completed,
            deadline:object.deadline

        }
    });
    

    res.status(200).json(data);


    

}



module.exports = {
    ShowTask,
    AddTask,
    AddMemeber,
    UpdateTask,
    ShowAllTasks
}

