const router = require('express').Router();
const { models } = require('../models');

router.post('/value', async(req, res) => {
    const { cleaningValue, laundryValue, mealPrepValue, petCareValue, shoppingValue, carCareValue, taxesValue } = req.body.value;

    try {
        await models.ValuesModel.create({
            cleaningValue: cleaningValue,
            laundryValue: laundryValue,
            mealPrepValue: mealPrepValue,
            petCareValue: petCareValue,
            shoppingValue: shoppingValue,
            carCareValue: carCareValue,
            taxesValue: taxesValue,
            userId: req.user.id,
            timeId: req.time.id,
            taskId: req.task.id
        })
        .then(
            value => {
                res.status(201).json({
                    value: value,
                    message: 'Value post create'
                });
            }
        )
    } catch(err) {
        res.status(500).json({
            error: `Failed to create value post: ${err}`
        });
    };
});

module.exports = router;