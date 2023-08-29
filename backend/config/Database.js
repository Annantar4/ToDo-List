import { Sequelize } from "sequelize"; 

const db = new Sequelize('ToDo_db', 'root', '',{
    host: "localhost",
    dialect: "mysql"
}) 

export default db;