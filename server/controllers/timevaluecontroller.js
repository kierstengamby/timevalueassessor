const router = require('express').Router();
const { TimeoutError } = require('sequelize/lib/errors');
const { models } = require('../models');
const validateJWT = require('../middleware/validate-session')

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

router.put('/:id', validateJWT, async (req, res) => {
    const { hourlyWage, neutralValue } = req.body.time;
    const timeId = req.params.id;
    const userId = req.user.id;

    const query = {
        where: {
            id: timeId,
            userId: userId
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

router.get('/', validateJWT, async(req, res) => {
    const userId = req.user.id;
    try {
        const results = await models.TimeValueModel.findAll({
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
})

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