import ToDO from "../models/Model.js";

export const getTodo = async(req,res)=>{
    try {
        const response = await ToDO.findAll({
            attributes:['id','Tugas', 'Deadline', 'Status']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error});
    }
}

export const getTodoByid = async(req,res)=>{
    const todo = await ToDO.findOne({
        where:{
            id : req.params.id
        }
    })
    if(!todo) return res.status(404).json({msg:"Tugas not found"})
    try {
        const response = await ToDO.findOne({
            attributes:['id','Tugas', 'Deadline', 'Status'],
            where:{
                id: todo.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.massage});
    }
} 

export const createTodo = async(req,res)=>{
    const {Tugas, Deadline, Status}= req.body
    try {
        await ToDO.create({
            Tugas : Tugas,
            Deadline : Deadline,
            Status : Status
        })
        res.status(201).json({msg: "Berhasil membuat To Do"})
    } catch (error) {
        res.status(400).json({msg: error.massage});
    }
}

export const updateTodo = async(req,res)=>{
    const todo = await ToDO.findOne({
        where:{
            id : req.params.id
        }
    })
    if(!todo) return res.status(404).json({msg: "Tugas not found"})
    const {Tugas, Deadline, Status}= req.body
    try {
        await ToDO.update({
            Tugas: Tugas,
            Deadline : Deadline,
            Status: Status
        },{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg:"TUGAS DI UPDATE"})
    } catch (error) {
        res.status(400).json({msg: error.massage});
    }
}

export const deleteTodo = async(req,res)=>{
    const todo = await ToDO.findOne({
        where:{
            id : req.params.id
        }
    })
    if(!todo) return res.status(404).json({msg: "Tugas not found"})
    try {
        await ToDO.destroy({
            where:{
                id : todo.id
            }
        })
        res.status(200).json({msg:"TUGAS DELETED"})
    } catch (error) {
        res.status(400).json({msg: error.massage}); 
    }
} 

