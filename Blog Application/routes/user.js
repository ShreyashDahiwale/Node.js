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
        const user = await User.matchPasswordAndGenerateToken(email, password);

        if (user) {
            // console.log(user);
            res.cookie('token', user);
            // res.send('Login successful');
            return res.redirect('/');
        } else {
            res.render('signin', { error: 'Invalid email or password' });
        }
    } catch (error) {
        res.render('signin', { error: 'Invalid email or password' });
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


router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.redirect('/');
});

module.exports = router;
