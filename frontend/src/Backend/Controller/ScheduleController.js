const Schedule = require('../Model/ScheduleSchema');


 const getAllSchedules = async (req, res) => {
        try {
            const schedules = await Schedule.find();
            res.json(schedules);
        } catch (err) {
            res.status(400).json('Error: ' + err);
        }
    }

const addSchedules = async (req, res) => {
        const { sport,startTime,endTime,coach } = req.body;
        const newSchedule = new Schedule({ sport, startTime, endTime, coach });

        try {
            await newSchedule.save();
            res.json('Schedule added!');
            console.log(newSchedule)
        } catch (err) {
            res.status(400).json('Error: ' + err);
        }
    }

 

const updateSchedule= async (req, res) => {
        try {
            const schedule = await Schedule.findById(req.params.id);
            schedule.sport = req.body.sport;
            schedule.startTime = req.body.startTime;
            schedule.endTime = req.body.endTime;
            schedule.coach = req.body.coach;

            await schedule.save();
            res.json('Schedule updated!');
        } catch (err) {
            res.status(400).json('Error: ' + err);
        }
    }

const deleteSchedule= async (req, res) => {
        try {
            await Schedule.findByIdAndDelete(req.params.id);
            res.json('Schedule deleted.');
        } catch (err) {
            res.status(400).json('Error: ' + err);
        }
    }

module.exports  = {
    addSchedules,getAllSchedules,updateSchedule,deleteSchedule
}