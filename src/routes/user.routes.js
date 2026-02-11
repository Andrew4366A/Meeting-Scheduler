const express=require("express")
const router=express.Router();
const {User}=require("../models/user/model/User")

module.exports=(db)=>{
     router.post("/", async (req, res) => {
       try {
         const user = await db.User.create(req.body);
         res.status(201).json(user);
       } catch (err) {
         res.status(400).json({ error: err.message });
       }
     });
     router.get("/:id",async(req,res)=>{
        try{
            const {id}=req.params
            const user =await User.findByPk(id)

            if(!user){
                return res.status(404).json({error:"User not found"})

            }
            return res.status(200).json(user)
        }
        catch(err){
            console.error(err)
            return res.status(500).json({error:"Interval server error"})
        }
     })
    return router
}