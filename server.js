const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyparser = require('body-parser')
require('dotenv').config()
const path = require('path'),
    PORT = process.env.PORT || 5000,
    routes = require('./routes/index')


mongoose.connect(process.env.MONGODB_URI || `mongodb://manuel:${process.env.DBPASSWORD}@ds031968.mlab.com:31968/studioleads`, { useNewUrlParser: true });
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use(routes)


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
}

//Enable for Prod
// app.get("*", (req, res)=>{
//     res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// })


app.listen(PORT, () => {
    console.log('App running on', PORT)
})