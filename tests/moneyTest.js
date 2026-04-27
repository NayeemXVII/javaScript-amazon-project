import { priceCentsFix } from "../scripts/utils/money.js";

console.log('Test Suite: priceCentsFix');

console.log('converts cents into dollars');
if (priceCentsFix(20) === '0.20') {
    console.log('Passed');
} else {
    console.log('Failed');
};

console.log('Works with zero')
if (priceCentsFix(0) == '0.00') {
    console.log('Passed');
} else {
    console.log('Failed');
};

console.log('rounds up to the nearest cents');
if (priceCentsFix(2000.5) == '20.01') {
    console.log('Passed');
} else {
    console.log('Failed');
};