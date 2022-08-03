const TaskModel = require('../model/TaskModel');
const { isPast } = require('date-fns');

const TaskValidation = async(req,res,next) => {
    const { macAddress, type, title, description, when } = req.body;

    if(!macAddress) return res.status(400).json({error: 'MAC Adress required'});
    else 
    if(!type) return res.status(400).json({error: 'Type required'});
    else
    if(!title) return res.status(400).json({error: 'Title required'});
    else
    if(!description) return res.status(400).json({error: 'Description required'});
    else
    if(!when) return res.status(400).json({error: '\'When\' required'});

    else {
        let exists;
        if(req.params.id){
            exists = await TaskModel.findOne({ 
                                        '_id': {'$ne': req.params.id},
                                        'when': {'$eq': new Date(when)}, 
                                        'macAddress': {'$in': macAddress}});
        }else{
            
            if(isPast(new Date(when))) return res.status(400).json({error: 'Invalid date'});
            
            exists = await TaskModel.findOne({ 
                                        'when': {'$eq': new Date(when)}, 
                                        'macAddress': {'$in': macAddress}});
        }

        if(exists) return res.status(400).json({error: 'This date is already taken'});
        else next();
    }
}

module.exports = TaskValidation;