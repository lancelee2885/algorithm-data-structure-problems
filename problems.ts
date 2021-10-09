
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

function countAnalogousArrays(arr: number[], l: number, u: number): number {
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
var nextPermutation = function (nums: number[]): number[] {
  let swapStart = 0;
  let swapEnd = 0;
  let found = false;

  // will need a swap function
  const swap = function (nums: number[], i:number, j:number): void {
    let temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
  }

  // will need a reverse function
  const reverse = function (nums: number[], start: number): void {
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
      return nums;
    }
  }
  reverse(nums, 0);
  return nums;
};

// console.log(nextPermutation([1,2,3]));
// console.log(nextPermutation([5,3,6,2,1,7]));
// console.log(nextPermutation([0,0,0,0,0,0]));
// console.log(nextPermutation([1,0,0,0,0,0]));
// console.log(nextPermutation([0,0,0,1,2]));
// console.log(nextPermutation([5,4,3,1,0]));




function howSum(target: number, nums: number[], memo: {[key: number]: number[] | null} = {}): number[] | null {
  if (target in memo) { return memo[target]}
  if (target === 0) return [];
  if (target < 0) return null;

  for (let num of nums) {
    let remainder: number = target - num;
    let remainderResult: any = howSum(remainder, nums, memo);
    if (remainderResult !== null) {
      memo[target] = [...remainderResult, num];
      return [...remainderResult, num];
    }
  }

  memo[target] = null;
  return null;
}

console.log(howSum(300, [4,3,5,1,6,2]));