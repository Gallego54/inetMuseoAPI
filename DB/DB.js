import {Sequelize} from "sequelize";

const conexion = new Sequelize('museo','root','',{
    host: 'localhost',
    dialect: 'mysql'
});

export default conexion;