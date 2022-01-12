const router = require('express').Router();
const { TimeoutError } = require('sequelize/lib/errors');
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

router.put('/time', async (req, res) => {
    const { hourlyWage, neutralValue } = req.body.time;
    const timeId = req.body.time.id;

    const query = {
        where: {
            id: timeId
        }
    };

    const updateTimeValueModel = { hourlyWage, neutralValue };

    try {
        const update = await models.TimeValueModel.update(updateTimeValueModel, query);
        res.status(200).json({ message: 'Time Value post successfully edited' });
    } catch(err) {
        res.status(500).json({ error: `${err}` });
    }
});

router.get('/time', async(req, res) => {   
    const { userId } = req.user.id;

    const getAll = {
        where: {
            id: userId
        }
    };

    try {
        const allTimePosts = await models.TimeValueModel.findAll({ getAll })
        res.status(200).json(allTimePosts)
    } catch(err) {
        res.status(500).json({
            error: `${err}`
        })
    }
});

router.delete('/time', async(req, res) =>{
    try {
        await models.TimeValueModel.destroy({ 
            where: {
                id: req.body.id 
            }
        }).then((result) => {
            if(result) {
                res.status(200).json({
                    message: 'Time Value Post successfully deleted',
                    deletedResult: `${result}`
                })
            } else {
                res.status(400).json({
                    message: 'Time Value Post does not exist'
                })
            }
        })
    } catch(err) {
        res.status(500).json({
            message: `Failed to delete Time Value Post: ${err}`
        })
    }
});

module.exports = router;