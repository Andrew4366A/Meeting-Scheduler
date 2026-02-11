const {Sequelize}=require("sequelize")


const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port:process.env.DB_PORT,
    dialect: process.env.DB_DIALECT || "mysql",
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