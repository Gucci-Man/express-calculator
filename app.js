const express = require('express')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/mean', function(req, res) {
    const {nums} = req.query
    let mean=null;
    let total=null;

    // split string then convert to int
    const numsArr = nums.split(',')
    const intArr = numsArr.map(num => parseInt(num));
    for(let i=0; i<intArr.length; i++) {
        console.log(`num is ${intArr[i]}`);
        total += intArr[i];
    }
    mean = total/intArr.length
    console.log(`mean is ${mean}`)
    
    return res.json({operation: "mean", value: mean});
})

app.listen(3000, () => {
    console.log('App running on port 3000')
})