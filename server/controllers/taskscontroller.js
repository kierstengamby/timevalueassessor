const router = require('express').Router();
const { models } = require('../models');

router.post('/tasks', async(req, res) => {
    const { cleaning, laundry, mealPrep, petCare, shopping, carCare, taxes } = req.body.tasks;

    try{
        await models.TasksModel.create({
            cleaning: cleaning,
            laundry: laundry,
            mealPrep: mealPrep,
            petCare: petCare,
            shopping: shopping,
            carCare: carCare,
            taxes: taxes,
            userId: req.user.id
        })
        .then(
            tasks => {
                res.status(201).json({
                    tasks: tasks,
                    message: 'Tasks created'
                });
            }
        )
    } catch(err) {
        res.status(500).json({
            error: `Failed to create tasks: ${err}`
        });
    };
});

router.put('/tasks', async(req, res) => {
    const { cleaning, laundry, mealPrep, petCare, shopping, carCare, taxes } = req.body.tasks;
    const tasksId = req.body.tasks.id;

    const query = {
        where: {
            id: tasksId
        }
    };

    const updateTasksModel = { cleaning, laundry, mealPrep, petCare, shopping, carCare, taxes };

    try{
        const update = await models.TasksModel.update(updateTasksModel, query);
        res.status(200).json({ message: 'Tasks post successfully edited' }); 
    } catch(err) {
        res.status(500).json({ error: `${err}` });
    }
});

router.get('/tasks', async(req, res) => {   
    const { userId } = req.user.id;

    const getAll = {
        where: {
            id: userId
        }
    };

    try {
        const allTasksPosts = await models.TasksModel.findAll({ getAll })
        res.status(200).json(allTasksPosts)
    } catch(err) {
        res.status(500).json({
            error: `${err}`
        })
    }
});

router.delete('/tasks', async(req, res) =>{
    try {
        await models.TasksModel.destroy({ 
            where: {
                id: req.body.id 
            }
        }).then((result) => {
            if(result) {
                res.status(200).json({
                    message: 'Tasks post successfully deleted',
                    deletedResult: `${result}`
                })
            } else {
                res.status(400).json({
                    message: 'Tasks post does not exist'
                })
            }
        })
    } catch(err) {
        res.status(500).json({
            message: `Failed to delete Tasks post: ${err}`
        })
    }
});

module.exports = router;