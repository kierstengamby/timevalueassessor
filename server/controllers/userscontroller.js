const router = require('express').Router();
const { models } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UniqueConstraintError } = require('sequelize/lib/errors');

router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body.user;
    try {
        await models.UsersModel.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: bcrypt.hashSync(password, 10)
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

