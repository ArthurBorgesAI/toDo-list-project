const express = require('express');
const router = express.Router();

const TaskController = require('../controller/TaskController');
const TaskValidation = require('../middlewares/TaskValidation');

// POSTs
router.post('/', TaskValidation ,  TaskController.create);

// GETs
router.get('/filter/all/:macAddress', TaskController.all);
router.get('/filter/late/:macAddress', TaskController.late);
router.get('/filter/today/:macAddress', TaskController.today);
router.get('/filter/week/:macAddress', TaskController.week);
router.get('/filter/month/:macAddress', TaskController.month);
router.get('/filter/year/:macAddress', TaskController.year);
router.get('/:id',  TaskController.show);

// PUTs
router.put('/:id', TaskValidation ,  TaskController.update);
router.put('/:id/:done',  TaskController.done);

// DELs
router.delete('/:id',  TaskController.delete);


module.exports = router;