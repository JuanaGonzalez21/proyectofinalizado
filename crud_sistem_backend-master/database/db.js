import {Sequelize} from 'sequelize'

/*const db = new  Sequelize(
    'a89qf1r0mrpj1of1',
    'p1pchn8yto2m236r',
    'ntc9htoskpug5xum',
    {
        host:'iu51mf0q32fkhfpl.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        dialect:'mariadb'
    })*/


const db = new  Sequelize(
    'database_salida',
    'root',
    'root',
    {
        host:'localhost',
        dialect:'postgres'
    })

export default db;
