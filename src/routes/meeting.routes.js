const express=require("express")
const router=express.Router()
const {Op}=require("sequelize")
const validateMeeting=require("../middlewares/validateMeeting")

module.exports=(db)=>{

   

    router.post("/",validateMeeting, async (req, res) => {
      try {
        const { userId, title, startTime, endTime } = req.body;

       

        //Conflict Check
        const conflict = await db.Meeting.findOne({
          where: {
            userId,
            startTime: { [Op.lt]: endTime },
            endTime: { [Op.gt]: startTime },
          },
        });
        if (conflict) {
          return res.status(400).json({ error: "Time slot is booked already" });
        }

        //Create Meeting
        const meeting = await db.Meeting.create({
          userId,
          title,
          startTime,
          endTime,
        });

        return res.status(201).json(meeting);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    router.get("/", async (req, res) => {
      try {
        const { userId, date } = req.query;
        const where = {};

        //Filter user
        if (userId) {
          where.userId = userId;
        }
        //Filter Date
        if (date) {
          const startDay = new Date(`${date} 00:00:00`);
          const endDay = new Date(`${date} 23:59:59`);

          where.startTime = {
            [Op.between]: [startDay, endDay],
          };
        }
        const meetings = await db.Meeting.findAll({
          where,
          order: [["startTime", "ASC"]],
        });
        res.json(meetings);
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    router.get("/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const meeting = await db.Meeting.findByPk(id);

        if (!meeting) {
          return res.status(404).json({ error: "Meeting not found" });
        }
        res.json(meeting);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    router.put("/:id",validateMeeting, async (req, res) => {
      try {
        const { id } = req.params;
        const { userId,title, startTime, endTime } = req.body;

        //Find meeting
        const meeting = await db.Meeting.findByPk(id);

        if (!meeting) {
          return res.status(404).json({ error: "Meeting not found" });
        } 

        console.log("checking conflict for:",startTime,endTime)


        //Conflict check
        const conflict = await db.Meeting.findOne({
          where: {
            id: { [Op.ne]: id },
            startTime: { [Op.lt]: new Date(endTime) },
            endTime: { [Op.gt]: new  Date(startTime) },
          },
        });
        const all=await db.Meeting.findAll()
        console.log(all)

        console.log("conflict found",conflict)

        if (conflict) {
          return res.status(400).json({ error: " Time slot already booked" });
        }

        //update meeting
        await meeting.update({
            userId,title,startTime,endTime,
        })
        res.json(meeting);
      } catch (err) {
        console.error("Update meeting error:", err);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    router.get("/test", (req, res) => {
      res.send("Server is working");
    });

    router.delete("/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const meeting = await db.Meeting.findByPk(id);

        if (!meeting) {
          return res.status(404).json({ error: "Meeting not found" });
        }
        await meeting.destroy();

        res.status(204).send();
      } catch (err) {
        console.error("Delete meeting error:", err);
        res.status(500).json({ error: "Internal server error" });
      }
    });

return router
}