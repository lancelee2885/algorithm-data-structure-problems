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
  const swap = function (nums: number[], i: number, j: number): void {
    let temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
  };

  // will need a reverse function
  const reverse = function (nums: number[], start: number): void {
    let i = start;
    let j = nums.length - 1;

    while (i < j) {
      swap(nums, i, j);
      i++;
      j--;
    }
  };

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

/** Practice on how to use memoization and recursion on DP.
 *
 * Given a target and an array of numbers, return any combination that can sum up to the target.
 * Numbers can be used more than once.
 *
 * @param target
 * @param nums
 * @param memo
 * @returns combination of numbers in an array
 */
function howSum(
  target: number,
  nums: number[],
  memo: { [key: number]: number[] | null } = {}
): number[] | null {
  if (target in memo) {
    return memo[target];
  }
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

// console.log(howSum(300, [7,14,3]));

/** Leetcode 1654
 *
 * A certain bug's home is on the x-axis at position x. Help them get there from position 0.
 *
 * The bug jumps according to the following rules:
 * It can jump exactly a positions forward (to the right).
 * It can jump exactly b positions backward (to the left).
 * It cannot jump backward twice in a row.
 * It cannot jump to any forbidden positions.
 * The bug may jump forward beyond its home, but it cannot jump to positions numbered with negative integers.
 *
 * Given an array of integers forbidden, where forbidden[i] means that the bug cannot jump to the position forbidden[i],
 * and integers a, b, and x, return the minimum number of jumps needed for the bug to reach its home.
 * If there is no possible sequence of jumps that lands the bug on position x, return -1.
 *
 */

function minimumJumps(
  forbidden: number[],
  a: number,
  b: number,
  x: number
): number {
  let visited = new Set(forbidden);
  let step = 0;
  let queue: any = [[0, false]];
  let limit = 2000 + b;

  while (queue) {
    let size = queue.length;

    while (size) {
      let [cur, is_backward] = queue.shift();
      size--;

      if (cur === x) return step;
      if (visited.has(cur)) continue;
      visited.add(cur);

      if (is_backward === false && cur - b > 0) queue.push([cur - b, true]);
      if (cur + a <= limit) queue.push([cur + a, false]);
    }

    step++;
  }
  return -1;
}
// console.log(minimumJumps([14,4,18,1,15], 3, 15, 9));

/** Leetcode 134
 * There are n gas stations along a circular route, where the amount of gas at the ith station is gas[i].
 * You have a car with an unlimited gas tank and it costs cost[i] of gas to travel from the ith station to its next (i + 1)th station. You begin the journey with an empty tank at one of the gas stations.
 *
 * Given two integer arrays gas and cost, return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return -1. If there exists a solution, it is guaranteed to be unique
 */

function canCompleteCircuit(gas: number[], cost: number[]): number {
  // for (let i = 0; i < gas.length; i++) {
  //   let currentGas = gas[i];
  //   let numberOfStations = 0;
  //   for (let j = i; j < cost.length; j++) {
  //     currentGas = currentGas - cost[j];
  //     if (currentGas < 0) break;
  //     numberOfStations++;
  //     if (cost[j + 1]) {
  //       currentGas = currentGas + gas[j + 1];
  //     } else {
  //       j = -1;
  //       currentGas = currentGas + gas[0];
  //     }
  //     if (numberOfStations === gas.length) return i;
  //   }
  // }
  // return -1;

  let totalTank = 0;
  let currTank = 0;
  let start = 0;

  for (let i = 0; i<gas.length; i++){
    totalTank += gas[i] - cost[i];
    currTank += gas[i] - cost[i];

    if (currTank < 0) {
      currTank = 0;
      start ++;
    }
  }

  if (totalTank >= 0) return start;
  return -1;

}
