const express = require('express');
const {
    Sequelize,
    DataTypes
} = require('sequelize');

const app = express();
const port = 8001;
const _USERS=require('./users.json');
//'postgres://Rogelio:123123@127.0.0.1:5432/Test'
const sequelize = new Sequelize('Test', 'Rogelio', '123123', {
    host: 'localhost',
    dialect: 'postgres',
    define: {
        freezeTableName: true
    }
});
const User = sequelize.define(
    'User', {
        name:DataTypes.STRING,
        email:{
            type:DataTypes.STRING,
            validate:{
                isEmail:true
            }
        },
        password:{
            type:DataTypes.STRING,
            validate:{
                isAlphanumeric:true
            }
        }
        }
);
(async () => {
    try {
        await sequelize.sync({
            logging: console.log,
            force: true
        });
        await User.bulkCreate(_USERS)
        console.log(typeof _USERS);
        
        /* await User.create({
          name: 'Rogelio',
          bio: 'New things comming'
        }); */
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

app.get('/', async (req, res) => {
    try {
        const data = await User.create({
            first: 'Rogelio',
            last:'Romero',
            bio: 'new things comming'
        });
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }

})

app.listen(port, () => {
    console.log('Running server port ' + port);
});