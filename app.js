const express = require('express')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/mean', function(req, res) {
    res.send('<h1>This is the mean of numbers</h1>')
})

app.listen(3000, () => {
    console.log('App running on port 3000')
})