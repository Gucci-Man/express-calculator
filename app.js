const express = require('express')
const ExpressError = require('./expressError')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

/********************** Mean **********************/
app.get('/mean', function(req, res, next) {
    try{
        const {nums} = req.query
        let mean=null;
        let total=null;
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

        for(let i=0; i<intArr.length; i++) {
            total += intArr[i];
        }
        // Calculate mean
        mean = total/intArr.length
        console.log(`mean is ${mean}`)
        
        return res.status(200).json({operation: "mean", value: mean});
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
        // sort array
        const sortedNums = intArr.sort();

        // Find the midpoint
        const midpoint = Math.floor(sortedNums.length / 2);

        // Calculate the median
        if (sortedNums.length % 2 === 0) {
            // Even-length array
            const median = (sortedNums[midpoint - 1] + sortedNums[midpoint]) / 2;
            return res.status(200).json({operation: "median", value: median})
        } else {
            // Odd-length array
            const median = sortedNums[midpoint];
            return res.status(200).json({operation: "median", value: median})
        };

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

        // Iterate through the array and update the frequency table
        for(let num of intArr) {
            if (freqTable[num] === undefined) {
                freqTable[num] = 1;
            } else {
                freqTable[num]++;
            }
        }

        // Identify the mode
        let modeVal = null;
        let highFreq = 0;

        for (let num in freqTable) {
            const frequency = freqTable[num];
            if (frequency > highFreq) {
                modeVal = num;
                highFreq = frequency;
            }
        }

        return res.status(200).json({operation: "mode", value: modeVal});

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