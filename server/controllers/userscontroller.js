const router = require('express').Router();
const { models } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validateJWT = require('../middleware/validate-session');
const { UniqueConstraintError } = require('sequelize/lib/errors');

router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, isAdmin } = req.body.user;
    try {
        await models.UsersModel.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: bcrypt.hashSync(password, 10),
            isAdmin: isAdmin
        })
        .then(
            user => {
                let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {expiresIn: 60*60*24});
                res.status(201).json({
                    user: user,
                    message: 'User successfully registered',
                    sessionToken: `Bearer ${token}`
                });
            }
        )
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: 'Email address already in use'
            });
        } else {
            res.status(500).json({
                error: `Error - User not registered: ${err}`
            });
        };
    };
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body.user;
    try {
        let loginUser = await models.UsersModel.findOne({
            where: {
                email: email,
            },
        });
        if (loginUser) {
            let passwordComparison = await bcrypt.compare(password, loginUser.password);
            if (passwordComparison) {
                let token = jwt.sign({ id: loginUser.id }, process.env.JWT_SECRET, {expiresIn: 60*60*24});
                
                res.status(200).json({
                    user: loginUser,
                    message: 'User successfully logged in',
                    sessionToken: `Bearer ${token}`
                });
            } else {
                res.status(401).json({
                    message: 'Incorrect email or password'
                });
            }
        } else {
            res.status(401).json({
                message: 'Incorrect email or password'
            });
        }
    } catch(err) {
        res.status(500).json({
            message: 'Failed to log user in'
        })
    }
});

router.get('/allinfo', validateJWT, async (req, res) => {
    const id = req.user.id;
    const isAdmin = req.user.isAdmin;

    if(isAdmin == true) {
        try {
            await models.UsersModel.findAll({
                include: [
                    {
                        model: models.TimeValueModel,
                        model: models.TasksModel
                        // model: models.ValuesModel
                    }
                ]
            })
            .then(
                users => {
                    res.status(200).json({
                        users: users
                    });
                }
            )
            } catch(err) {
            res.status(500).json({
                error: `Failed to retriever user info: ${err}`
            });
        };
    } else {
        try {
            await models.UsersModel.findAll({
                where: {
                    id: id
                },
                include: [
                    {
                        model: models.TimeValueModel,
                        model: models.TasksModel
                        // model: models.ValuesModel
                    }
                ]
            })
            .then(
                users => {
                    res.status(200).json({
                        users: users
                    });
                }
            )
        } catch(err) {
            res.status(500).json({
                error: `Failed to retriever user info: ${err}`
            });
        };
    }
});

module.exports = router;