
module.exports=(req,res,next)=>{
    const {userId,title,startTime,endTime}=req.body

    if(!userId||!title||!startTime||!endTime){
        return res.status(400).json({error:"userId,title,startTime and endTime are required"})
    }

    if(isNaN(Date.parse(startTime))||isNaN(Date.parse(endTime))){
        return res.status(400).json({
            error:"Invalid date format",
        })
    }
    if(new Date(startTime)>=new Date(endTime)){
        return res.status(400).json({
            error:"startTime must be before endTime",
        })
    }
    next()
}