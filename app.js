const express = require('express')
const ExpressError = require('./expressError')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/mean', function(req, res, next) {
    try{
        const {nums} = req.query
        let mean=null;
        let total=null;
        const intArr = []; // will contain the integer converted numbers

        if (!nums) {
            throw new ExpressError("nums are required.", 400)
        };
        // split string then convert to int
        const numsArr = nums.split(',')
        
        for(let num of numsArr) {
            if(!(parseInt(num))) {
                throw new ExpressError(`${num} is not a number`, 400)
            };
            intArr.push(parseInt(num));
        }

        for(let i=0; i<intArr.length; i++) {
            total += intArr[i];
        }
        mean = total/intArr.length
        console.log(`mean is ${mean}`)
        
        return res.status(200).json({operation: "mean", value: mean});
    } catch (e) {
        next(e);
    }
})

// If page is not found, throw error
app.use((req, res, next) => {
    const e = new ExpressError("Page Not Found", 404);
    next(e);
})

app.use(function (err, req, res, next) {
    let status = err.status || 500;
    let message = err.msg;

    return res.status(status).json({
        error: {message, status}
    });
});

app.listen(3000, () => {
    console.log('App running on port 3000')
})