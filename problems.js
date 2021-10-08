/*
 * Complete the 'countAnalogousArrays' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY consecutiveDifference
 *  2. INTEGER lowerBound
 *  3. INTEGER upperBound
 */

function countAnalogousArrays(arr, l, u) {
  let a = 0;
  let max = 0;
  let min = 0;
  for (let i=0; i<arr.length; i++){
    a = a-arr[i];
    max = Math.max(a, max); // l-0
    min = Math.min(a, min); // l-5
  }
  max = u - max;
  min = l - min;
  
  if (max-min+1 >= 0) return max-min+1;
  else return 0;
}

console.log(countAnalogousArrays([-2, -1, -2, 5], 3, 10));
console.log(countAnalogousArrays([-1, -1, -1, -1], 1, 10));
console.log(countAnalogousArrays([0,0,0,5,0,0], 1, 10)); //   10 10 10 10 5 5 5 | 9 9 9 9 4 4 4 | ... | 6 6 6 6 1 1 1
console.log(countAnalogousArrays([0,0,0,0,0,0], 1, 10)); //   10 10 10 10 5 5 5 | 9 9 9 9 4 4 4 | ... | 6 6 6 6 1 1 1
console.log(countAnalogousArrays([10,-10,10,-10,10,-10], 0, 10)); //   10 10 10 10 5 5 5 | 9 9 9 9 4 4 4 | ... | 6 6 6 6 1 1 1