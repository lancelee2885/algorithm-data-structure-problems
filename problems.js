
// --------------Bytedance Prep----------------------
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
  for (let i = 0; i < arr.length; i++) {
    a = a - arr[i];
    max = Math.max(a, max); // l-0
    min = Math.min(a, min); // l-5
  }
  max = u - max;
  min = l - min;

  if (max - min + 1 >= 0) return max - min + 1;
  else return 0;
}

// console.log(countAnalogousArrays([-2, -1, -2, 5], 3, 10));
// console.log(countAnalogousArrays([-1, -1, -1, -1], 1, 10));
// console.log(countAnalogousArrays([0,0,0,5,0,0], 1, 10)); 
// console.log(countAnalogousArrays([0,0,0,0,0,0], 1, 10)); 
// console.log(countAnalogousArrays([10,-10,10,-10,10,-10], 0, 10)); 


/** Leetcode 31:
 * Implement next permutation, which rearranges numbers into the lexicographically next greater permutation of numbers.
 * If such an arrangement is not possible, it must rearrange it as the lowest possible order (i.e., sorted in ascending order).
 * The replacement must be in place and use only constant extra memory.
 * 
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function (nums) {
  let swapStart = 0;
  let swapEnd = 0;
  let found = false;

  // will need a swap function
  const swap = function (nums, i, j) {
    let temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
  }

  // will need a reverse function
  const reverse = function (nums, start) {
    let i = start;
    let j = nums.length - 1;

    while (i < j) {
      swap(nums, i, j);
      i++;
      j--;
    }
  }

  // 1. starting on the right, find the first number decreasing when moving leftward. i.e. [i-1] < [i];
  // 2. once the idx is found, starting at that idx+1, find the number just larger than that idx;
  // 3. flip the two positions
  // 4. reverse everything on the right side of right swapped position.
  
  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i - 1] < nums[i]) {
      found = true;
      swapStart = i - 1;
      swapEnd = i;
      for (let j = i; j < nums.length - 1; j++) {
        if (nums[j + 1] <= nums[j] && nums[j + 1] > nums[i - 1]) {
          swapEnd = j + 1;
        }
      }
    }
    if (found === true) {
      swap(nums, swapStart, swapEnd);
      reverse(nums, swapStart + 1);
      return
    }
  }
  reverse(nums, 0);
};





