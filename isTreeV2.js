function constructSExpression(s) {

  let codeA = 'A'.charCodeAt(0);
  let graph = [...Array(26)].map(a => Array(26));
  let set = new Set();

  //Checking E2: duplicate edges
  let E2 = false;
  let numOfEdges = 0;
  for (let i=1; i<s.length; i+=6){
    let x = s[i].charCodeAt(0) - codeA;
    let y = s[i+2].charCodeAt(0) - codeA;
    if (graph[x][y]) {
      E2 = true;
    }
    graph[x][y] = true;
    set.add(s[i]);
    set.add(s[i+2]);
    numOfEdges++
  }

  //Checking E1: More than two children
  let E1 = false;
  for (let i=0; i<26; i++){
    let count = 0;
    for (let j = 0; j<26; j++){
      if (graph[i][j]) {
        count++;
      }
    }
    if (count > 2){
      return E1;
    }
  }

  if(E2) return 'E2';
  
  let numOfRoots = 0;
  let root = ' ';
  // console.log(set);
  let isCycle = false;
  set.forEach(c => {
    for (let i=0; i<26; i++){
      if(graph[i][ltrCode(c) - codeA]){
        break;
      }
      if(i===25) {
        numOfRoots++;
        root = c;
        let visited = new Array(26).fill(undefined);
        if (detectCycle(c, graph, visited)){
          isCycle = true;
        }
      }
    }
  })
  if (numOfRoots == 0 || isCycle===true) return 'E3';
  if (numOfRoots > 1) return 'E4';

  function detectCycle(c, graph, visited) {

    if (visited[ltrCode(c) - codeA]) return true;

    visited[ltrCode(c) - codeA] = true;

    for (let i=0; i<26; i++){
      if (graph[ltrCode(c) - codeA][i]) {
        let x = String.fromCharCode(codeA + i);
        if (detectCycle(x, graph, visited)){
          return true;
        }
      }
    }
    return false;
  }

  function getSExpression(root, graph){
    let left = '';
    let right = '';
    for (let i=0; i<26; i++) {
      if (graph[ltrCode(root) - codeA][i]){
        left = getSExpression(String.fromCharCode(codeA + i), graph);
        for (let j = i+1; j<26; j++){
          if (graph[ltrCode(root) - codeA][j]) {
            right = getSExpression(String.fromCharCode(codeA + j), graph);
            break;
          }
        }
        break;
      }
    }
    return (`(${root}${left}${right})`)
  }

  function ltrCode(s) {
    return s.charCodeAt(0);
  }

  return getSExpression(root, graph);


}

console.log(constructSExpression("(A,B) (A,C) (B,G) (C,H) (E,F) (B,D) (C,E)"));
console.log(constructSExpression("(B,D) (D,E) (A,B) (C,F) (E,G) (A,C)"));
console.log(constructSExpression("(A,B) (A,C) (B,D) (D,C)"));