// # Tiktok has its latest video trend going viral!  
// # You are given (2) m x n grids, A and B where each cell can have one of three values:
// # * O representing a person without tiktok :(
// # * T representing a tiktok user, or
// # * V representing a user who's seen the viral trend.
// # Every minute, any tiktok user (T) that is 4-directionally adjacent to a viral video (V) gets shown the video.
// # Grid A is the starting grid.
// # Grid B is the forcasted ending grid.
// # Return the minimum number of minutes that it takes until the video goes viral, starting at grid A until all forecasted users have seen the video, grid B.   That is, the number of minutes it takes until grid A turns to grid B.
// # If the video isn't viral, return -1.

// # Example 1:
// # Input: grid A =                grid B =
// # [["V", "T", "T"],           [["V", "V", "V"],
// #  ["T", "T", "O"],     ->     ["V", "V", "O"],
// #  ["O", "T", "T"]]            ["O", "V", "T"]]
// # Output: 3

// # Example 2:
// # Input: grid A =                grid B =
// # [["V", "T", "T"],           [["V", "V", "V"],
// #  ["O", "T", "T"],     ->     ["O", "V", "V"],
// #  ["T", "O", "T"]]            ["V", "O", "V"]]
// # Output: -1
// # Explanation: The human in the bottom left corner (row 2, column 0) is never shown the viral video, because turning only happens 4-directionally.

// # Example 3:
// # Input:  grid A =              grid B =
// #            [["O", "V"]]   ->   [["O", "V"]]
// # Output: 0
// # Explanation: Since the two grids are the same, the answer is just 0.

// # Example 4:
// # Input:  grid A =              grid B =
// #            [["O", "V"]]   ->   [["O", "V"]]
// #            [["O", "O"]]   ->   [["O", "O"]]
// #            [["O", "T"]]   ->   [["O", "V"]]
// # Output: -1

// # Constraints:
// # * m‍‍‌‌‌‍‍‍‍‌‌‌‍‌‌‍‌‌‌‌ == grid.length
// # * n == grid.length
// # * 1 <= m, n <= 10
// # * grid[j] is "O", "T", or "V".`

function viral(gridA, gridB) {
  let expected = '';
  let currOutput = '';
  let result = 0;

  let queue = []
  let visited = new Set();

  for (let i = 0; i < gridA.length; i++) {
    for (let j = 0; j < gridA[i].length; j++) {
      if (gridA[i][j] === 'V') {
        currOutput += `${i}${j} `;
        queue.push([i, j]);
      }
    }
  }

  for (let i = 0; i < gridB.length; i++) {
    for (let j = 0; j < gridB[i].length; j++) {
      if (gridB[i][j] === 'V') expected += `${i}${j} `
    }
  }

  if (expected === currOutput) return 0;

  while (queue.length) {
    result++;
    let size = queue.length;
    while (size) {
      let [rows, cols] = queue.shift();
      let check = `${rows}${cols}`
      size--;

      if (visited.has(check)) continue;
      visited.add(check);

      if (gridA[rows][cols] === 'V') {
        if (gridA[rows + 1]) {
          if (gridA[rows + 1][cols] === 'T') gridA[rows + 1][cols] = 'V';
          queue.push([rows + 1, cols])
        };
        if (gridA[rows - 1]) {
          if (gridA[rows - 1][cols] === 'T') gridA[rows - 1][cols] = 'V';
          queue.push([rows - 1, cols])
        };
        if (gridA[rows][cols + 1]) {
          if (gridA[rows][cols + 1] === 'T') gridA[rows][cols + 1] = 'V';
          queue.push([rows, cols + 1])
        };
        if (gridA[rows][cols - 1]) {
          if (gridA[rows][cols - 1] === 'T') gridA[rows][cols - 1] = 'V';
          queue.push([rows, cols - 1])
        };
      }

    }

    currOutput = '';

    for (let i = 0; i < gridA.length; i++) {
      for (let j = 0; j < gridA[i].length; j++) {
        if (gridA[i][j] === 'V') currOutput += `${i}${j} `
      }
    }
    if (currOutput === expected) return result;

  }

  return -1;

}

let gridA1 = [
  ['V', 'T', 'T'],
  ['T', 'T', 'O'],
  ['O', 'T', 'T']
]

let gridB1 = [
  ['V', 'V', 'V'],
  ['V', 'V', 'O'],
  ['O', 'V', 'T']
]

let gridA2 = [
  ['V', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
  ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'O'],
  ['T', 'T', 'O', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'O', 'T']
]

let gridB2 = [
  ['V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V'],
  ['V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'O'],
  ['V', 'V', 'O', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'O', 'V']
]

console.log(viral(gridA2, gridB2));