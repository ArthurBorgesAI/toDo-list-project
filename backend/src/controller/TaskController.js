const TaskModel = require('../model/TaskModel');
const { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } = require('date-fns');

const CURRENT_TIME = new Date();

class TaskController {
    
    async create(req,res){
        const task = new TaskModel(req.body);
        await task.save()
                .then(response => {
                    return res.status(200).json(response);
                })
                .catch(error => {
                    return res.status(500).json(error);
                });
    }


    async update(req,res){
        await TaskModel.findByIdAndUpdate({'_id': req.params.id}, req.body, {new: true})
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(200).json(error);
            });
    }


    async all(req,res){
        await TaskModel.find({macAddress: {'$in': req.params.macAddress}})
                                            .sort('when')
                                            .then(response => {
                                                return res.status(200).json(response);
                                            })
                                            .catch(error => {
                                                return res.status(500).json(error);
                                            });
    }   

    
    async show(req,res){
        await TaskModel.findById(req.params.id)
                            .then(response => {
                                if(response) res.status(200).json(response);
                                else res.status(404).json({error: 'Task not found'});
                            })
                            .catch(error => {
                                return res.status(500).json(error);
                            });
    }


    async delete(req,res){
        await TaskModel.deleteOne({'_id': req.params.id})
                            .then(response => {
                                return res.status(200).json(response);
                            })
                            .catch(error => {
                                return res.status(500).json(error);
                            })
    }


    async done(req,res){
        await TaskModel.findByIdAndUpdate(
                            {'_id': req.params.id},
                            {'done': req.params.done},
                            {new:true})
                                .then(response => {
                                    return res.status(200).json(response);
                                })
                                .catch(error => {
                                    return res.status(500).json(error);
                                });
    }


    async late(req, res){
        await TaskModel.find({
            'when': {'$lt': CURRENT_TIME},
            'macAddress': {'$in': req.params.macAddress}
        })
            .sort('when')
            .then( response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            })
    }


    async today(req, res){
        await TaskModel.find({
            'when': {'$gte': startOfDay(CURRENT_TIME), '$lte': endOfDay(CURRENT_TIME)},
            'macAddress': {'$in': req.params.macAddress}
        })
            .sort('when')
            .then( response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            })
    }


    async week(req, res){
        await TaskModel.find({
            'when': {'$gte': startOfWeek(CURRENT_TIME), '$lte': endOfWeek(CURRENT_TIME)},
            'macAddress': {'$in': req.params.macAddress}
        })
            .sort('when')
            .then( response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            })
    }


    async month(req, res){
        await TaskModel.find({
            'when': {'$gte': startOfMonth(CURRENT_TIME), '$lte': endOfMonth(CURRENT_TIME)},
            'macAddress': {'$in': req.params.macAddress}
        })
            .sort('when')
            .then( response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            })
    }


    async year(req, res){
        await TaskModel.find({
            'when': {'$gte': startOfYear(CURRENT_TIME), '$lte': endOfYear(CURRENT_TIME)},
            'macAddress': {'$in': req.params.macAddress}
        })
            .sort('when')
            .then( response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            })
    }


}

module.exports = new TaskController()