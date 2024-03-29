const express = require('express')
const ExpressError = require('./expressError')
const app = express();

const {findMean, findMedian, findMode} = require('./helpers')

app.use(express.json());
app.use(express.urlencoded({extended: true}));

/********************** Mean **********************/
app.get('/mean', function(req, res, next) {
    try{
        const {nums} = req.query
        const intArr = []; // will contain the integer converted numbers

        if (!nums) {
            throw new ExpressError("nums are required.", 400)
        };
        // Split string then convert to int
        const numsArr = nums.split(',')
        
        for(let num of numsArr) {
            if(!(parseInt(num))) {
                throw new ExpressError(`${num} is not a number`, 400)
            };
            intArr.push(parseInt(num));
        }
        
        return res.status(200).json({operation: "mean", value: findMean(intArr)});
    } catch (e) {
        next(e);
    }
});

/********************** Median **********************/
app.get('/median', function(req, res, next) {
    try{
        const {nums} = req.query
        const intArr = []; 

        if (!nums) {
            throw new ExpressError("nums are required.", 400)
        };
        // Split string then convert to int
        const numsArr = nums.split(',')
        
        for(let num of numsArr) {
            if(!(parseInt(num))) {
                throw new ExpressError(`${num} is not a number`, 400)
            };
            intArr.push(parseInt(num));
        }
       
        return res.status(200).json({operation: "median", value: findMedian(intArr)});

    } catch (e) {
        next(e);
    }
});

/********************** Mode *************************/
app.get('/mode', function(req, res, next) {
    try{
        const {nums} = req.query
        const intArr = []; 
        const freqTable = {} // Frequency table

        if (!nums) {
            throw new ExpressError("nums are required.", 400)
        };
        // Split string then convert to int
        const numsArr = nums.split(',')
        
        for(let num of numsArr) {
            if(!(parseInt(num))) {
                throw new ExpressError(`${num} is not a number`, 400)
            };
            intArr.push(parseInt(num));
        }
        return res.status(200).json({operation: "mode", value: findMode(intArr)});

    } catch (e) {
        next(e);
    }
});

// If page is not found, throw error
app.use((req, res, next) => {
    const e = new ExpressError("Page Not Found", 404);
    next(e);
})

// Error-handler
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