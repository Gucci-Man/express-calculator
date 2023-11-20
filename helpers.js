
function findMean(arr) {
    let mean=null;
    let total=null;

    for(let i=0; i<arr.length; i++) {
        total += arr[i];
    }
    // Calculate mean
    mean = total/arr.length
    console.log(`mean is ${mean}`)
    return mean;
}

function findMedian(arr) {
    // sort array
    const sortedNums = arr.sort((a, b) => a- b);

    // Find the midpoint
    const midpoint = Math.floor(sortedNums.length / 2);

    // Calculate the median
    if (sortedNums.length % 2 === 0) {
        // Even-length array
        const median = (sortedNums[midpoint - 1] + sortedNums[midpoint]) / 2;
        return median;
    } else {
        // Odd-length array
        const median = sortedNums[midpoint];
        return median;
    };
}

function findMode(arr) {
    const freqTable = {} // Frequency table

    // Iterate through the array and update the frequency table
    for(let num of arr) {
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
    return modeVal;
}

module.exports = {
    findMean,
    findMedian,
    findMode
};