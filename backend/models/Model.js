import { Sequelize } from "sequelize"; 
import db from "../config/Database.js"; 

const{DataTypes}= Sequelize;

const ToDO = db.define('ToDo',{
    Tugas:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    Deadline:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    Status:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
},{
    freezeTableName: true
}) 
export default ToDO