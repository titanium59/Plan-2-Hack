const express = require("express");
const req = require("express/lib/request");
const mongoose = require('mongoose');
const path = require("path");
const { findById } = require("./models/database");
const userData = require('./models/database');
const postData = require('./models/postdatabase');
const methodOverride = require('method-override')

mongoose.connect('mongodb://localhost:27017/fitnessapp',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console,"connection error:"));
db.once("open",() => {
    console.log("database connected");
});

const app = express();
app.use(methodOverride('_method'))

app.use(express.urlencoded({extended: true}));
app.use('/public', express.static('public'));
app.set('view engine' , 'ejs');
app.set('views',path.join(__dirname,'views'));

app.get('/', (req,res) => {
    res.render('index.ejs');
});

app.get('/makeuser', async (req,res) => {
    res.render('newuserform.ejs');
});

app.get('/login', async (req,res) => {
    res.render("loginform.ejs");
})

app.post('/login', async(req,res) => {
    const userdata = req.body;
    const username = userdata.username;
    const existingUserData = await userData.find({username: username});
    const id = existingUserData[0].id;
    if(existingUserData[0].password === userdata.password) res.redirect(`/login/${id}`);
    else res.send('error');
})

app.get('/login/:id',async (req,res) => {
    const { id } = req.params;
    const userdata = await userData.findById(id);
    res.render('afterlogin.ejs', { userdata });
})

app.post('/users',async (req,res) => {
    const newUserData = new userData(req.body);
    await newUserData.save();
    res.redirect('/');
})

app.get('/workoutstart', (req,res) => {
    res.render('workoutTemplate.ejs')
})

app.get('/community' , async(req,res) => {
    const postdata = await postData.find({});
    res.render('community.ejs', { postdata });
})

app.post('/newpost' , async(req,res) => {
    const data = new postData({Question : req.body.question})
    await data.save();
    res.redirect("/community")
})
app.get('/comment/:id', async(req,res) => {
    const { id } = req.params;
    const qna = await postData.findById(id);
    res.render("commentsid.ejs", { qna })
})
app.put('/comment/:id', async(req,res)=> {
    const {id } = req.params;
    const ans = await postData.findById(id);
    ans.Answer.push(req.body.answer);
    await ans.save();
    console.log(ans);
    res.redirect(`/comment/${id}`);
})
app.listen(3000,() => {
    console.log("on port 3000");
})