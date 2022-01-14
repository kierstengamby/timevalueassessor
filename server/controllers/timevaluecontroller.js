const router = require('express').Router();
const { TimeoutError } = require('sequelize/lib/errors');
const { models } = require('../models');
const validateJWT = require('../middleware/validate-session');

router.post('/time', validateJWT, async(req, res) => {
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
    const isAdmin = req.user.isAdmin;

    const query = {
        where: {
            id: timeId,
            userId: userId
        }
    };

    const adminQuery = {
        where: {
            id: timeId
        }
    };

    const updateTimeValueModel = { hourlyWage, neutralValue };

    if(isAdmin == true){
        try {
            const update = await models.TimeValueModel.update(updateTimeValueModel, adminQuery);
            res.status(200).json({ message: 'Time Value post successfully edited' });
        } catch(err) {
            res.status(500).json({ error: `${err}` });
        }
    } else {
        try {
            const update = await models.TimeValueModel.update(updateTimeValueModel, query);
            res.status(200).json({ message: 'Time Value post successfully edited' });
        } catch(err) {
            res.status(500).json({ error: `${err}` });
        }
    }
});

router.get('/', validateJWT, async(req, res) => {
    const userId = req.user.id;
    const isAdmin = req.user.isAdmin;

    if(isAdmin == true){
        try {
            const results = await models.TimeValueModel.findAll();
            res.status(200).json(results)
        } catch(err) {
            res.status(500).json({
                error: `${err}`
            })
        }
    } else {
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
    }
})


router.delete('/:id', validateJWT, async(req, res) =>{
    const userId = req.user.id;
    const isAdmin = req.user.isAdmin;

    if(isAdmin == true) {
        try {
            await models.TimeValueModel.destroy({
                where: {
                    id: req.params.id
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
    } else {
        try {
            await models.TimeValueModel.destroy({ 
                where: {
                    id: req.params.id, 
                    userId: userId
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
    }
});

module.exports = router;