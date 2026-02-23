const express = require('express');
const path = require("path");
const mongoose = require('mongoose');
const User = require('./models/user');
const cookieParser = require('cookie-parser');
const {checkForAuthentication} = require('./middlewares/authentication');

const userRoute = require('./routes/user');

const app = express();
const PORT = 8000;

mongoose.connect('mongodb://localhost:27017/blog-app')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

app.set('view engine', 'ejs')
app.set('views', path.resolve("./views"));

app.use(cookieParser());
app.use(checkForAuthentication('token'));

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.resolve("./public")));


app.get("/", (req, res) => {
    res.render("home", {
        user: req.user
    });
})

app.use("/user", userRoute);

app.listen( PORT , () => console.log(`Server Started at PORT:${PORT}`));