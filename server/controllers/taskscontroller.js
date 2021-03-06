const router = require('express').Router();
const { models } = require('../models');
const validateJWT = require('../middleware/validate-session');

router.post('/task', validateJWT, async(req, res) => {
    const { cleaning, laundry, mealPrep, petCare, shopping, carCare, taxes } = req.body.task;

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
            task => {
                res.status(201).json({
                    task: task,
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
    const { cleaning, laundry, mealPrep, petCare, shopping, carCare, taxes } = req.body.task;
    const tasksId = req.params.id;
    const userId = req.user.id;
    const isAdmin = req.user.isAdmin;

    const query = {
        where: {
            id: tasksId,
            userId: userId
        }
    };

    const adminQuery = {
        where: {
            id: tasksId
        }
    };

    const updateTasksModel = { cleaning, laundry, mealPrep, petCare, shopping, carCare, taxes };

    if(isAdmin == true){
        try{
            const update = await models.TasksModel.update(updateTasksModel, adminQuery);
            res.status(200).json({ message: 'Tasks post successfully edited' }); 
        } catch(err) {
            res.status(500).json({ error: `${err}` });
        }
    } else {
        try{
            const update = await models.TasksModel.update(updateTasksModel, query);
            res.status(200).json({ message: 'Tasks post successfully edited' }); 
        } catch(err) {
            res.status(500).json({ error: `${err}` });
        }
    }
});

router.get('/', validateJWT, async(req, res) => {
    const userId = req.user?.id;
    const isAdmin = req.user?.isAdmin;

    if(isAdmin == true){
        try{
            const results = await models.TasksModel.findAll();
            res.status(200).json(results)
        } catch(err) {
            res.status(500).json({
                error: `${err}`
            })
        }
    } else {
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
    }
});

router.delete('/:id', validateJWT, async(req, res) =>{
    const userId = req.user.id;
    const isAdmin = req.user.isAdmin;

    if(isAdmin == true){
        try {
            await models.TasksModel.destroy({ 
                where: {
                    id: req.params.id
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
    } else {
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
    }
});

module.exports = router;