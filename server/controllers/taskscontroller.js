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

module.exports = router;