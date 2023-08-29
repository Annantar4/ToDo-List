import express from "express";
import { getTodo,getTodoByid,createTodo,updateTodo,deleteTodo } from "../controllers/controllers.js";

const router = express.Router();

router.get('/Todo', getTodo);
router.get('/Todo/:id', getTodoByid);
router.post('/Todo', createTodo);
router.patch('/Todo/:id', updateTodo);
router.delete('/Todo/:id', deleteTodo);

export default router