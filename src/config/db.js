const {Sequelize}=require("sequelize")


const sequelize = new Sequelize(
  process.env.MYSQLDATABASE,
  process.env.MYSQLUSER,
  process.env.MYSQLPASSWORD,
  {
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    dialect: "mysql",
    logging: false,

  },
);

const db={}

db.Sequelize=Sequelize
db.sequelize=sequelize

db.User=require("../models/user/model/User")(sequelize,Sequelize)
db.Meeting=require("../models/meeting/model/Meeting")(sequelize,Sequelize)

db.User.hasMany(db.Meeting,{
    foreignKey:"userId",
    onDelete:"CASCADE",
})
db.User.belongsTo(db.User, {
  foreignKey: "userId",
  
});


const connectDb=async()=>{
    try{
        await sequelize.authenticate()
        console.log("Database connected successfully")

        await sequelize.sync()
        console.log("Models synced")

    }
    catch(err){
        console.error("Unable to connect to database",err.message)
    }
}

module.exports={
    db,sequelize,connectDb
}