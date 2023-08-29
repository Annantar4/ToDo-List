import express from "express";
import cors from "cors";
import router from "./route/route.js";
import db from "./config/Database.js";

const app = express(); 

// (async()=>{
//     await db.sync();
// })() // untuk membuat tabel secara auto (cuma dipakai diawal saja okee)


app.use(cors({
    credentials: false,
    origin: 'http://Localhost:3000'
}))

app.use(express.json());

app.use(router);

app.listen(5000, ()=>{
    console.log('Server Running');
})