const Sequelize = require('sequelize');
const db = new Sequelize('postgress://localhost:5432/wikistackDB');

const Page = db.define('page',{
    title: Sequelize.STRING,
    urlTitle : Sequelize.STRING,
    content : Sequelize.STRING,
    status : Sequelize.NUMBER
});

db.sync()
.then(complete=>){
    
}