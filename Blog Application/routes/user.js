const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get('/signin', (req, res) => {
    res.render('signin');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.matchPassword(email, password);

        if (user) {
            res.send('Login successful');
            console.log(user);
            return res.redirect('/');
        } else {
            res.render('signin', { error: 'Invalid email or password' });
        }
    } catch (error) {
        res.render('signin', { error: 'An error occurred during login' });
    };
});

router.post('/signup', async (req, res) => {
    const { fullname, email, password } = req.body;
    try {
        await User.create({
            fullName: fullname,
            email,
            password
        });
        return res.redirect('/');
    } catch (error) {
        res.render('signup', { error: error.message });
    }
});

module.exports = router;
