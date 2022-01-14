const router = require('express').Router();
const { models } = require('../models');
const validateJWT = require('../middleware/validate-session');

router.post('/tasks', validateJWT, async(req, res) => {
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

router.put('/:id', validateJWT, async(req, res) => {
    const { cleaning, laundry, mealPrep, petCare, shopping, carCare, taxes } = req.body.tasks;
    const tasksId = req.params.id;
    const userId = req.user.id;

    const query = {
        where: {
            id: tasksId,
            userId: userId
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

router.get('/', validateJWT, async(req, res) => {   
    const userId = req.user.id;
    try{
        const results = await models.TasksModel.findAll({
            where: {
                userId: userId
            }
        });
        res.status(200).json(results)
    } catch(err) {
        res.status(500).json({
            error: `${err}`
        })
    }
});

router.delete('/:id', validateJWT, async(req, res) =>{
    const userId = req.user.id;
    try {
        await models.TasksModel.destroy({ 
            where: {
                id: req.params.id,
                userId: userId 
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