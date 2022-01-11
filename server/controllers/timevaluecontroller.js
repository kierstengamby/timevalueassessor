const router = require('express').Router();
const { models } = require('../models');

router.post('/time', async(req, res) => {
    const { hourlyWage, neutralValue } = req.body.time;
   
    try {
        await models.TimeValueModel.create({
            hourlyWage: hourlyWage,
            neutralValue: neutralValue,
            userId: req.user.id
        })
        .then(
            time => {
                res.status(201).json({
                    time: time,
                    message: 'Time Value post created'
                });
            }
        )
    } catch(err) {
        res.status(500).json({
            error: `Failed to create time value post: ${err}`
        });
    };
});

module.exports = router;