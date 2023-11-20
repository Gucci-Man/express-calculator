
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

module.exports = {
    findMean
};