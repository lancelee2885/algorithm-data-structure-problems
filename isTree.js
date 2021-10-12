class Node {
  constructor(data) {
    this.data = data;
    this.children = [];
    this.parents = [];
  }
}

function isTree(inputData) {
  let nodes = {};
  let roots = {};
  let errors = {};

  let data = ')' + inputData + '(';
  let x = '';
  data.split(')(').forEach(pc => {
    if (!pc.length) return;

    let parent = pc.split(' ')[0];
    let child = pc.split(' ')[1];

    let parentNode, childNode;

    if (!nodes[parent]) {
      parentNode = new Node(data = parent);
      nodes[parent] = parentNode;
    } else {
      parentNode = nodes[parent];
    }

    if (!nodes[child]) {
      childNode = new Node(data = child);
      nodes[child] = childNode;
    } else {
      childNode = nodes[child];
    }
    
    if (!parentNode.parents.length) {
      roots[parent] = parentNode;
    }
    delete roots[child];

    if (childNode.parents.length) {
      errors['E5'] = true;
    } else {
      childNode.parents.push(parentNode);
    }

    if (parentNode.children.indexOf(childNode) !== -1){
      errors['E2'] = true;
    } else {
      parentNode.children.push(childNode);
    }

    if (parentNode.children.length > 2) {
      errors['E1'] = true;
    }
  });

  if (Object.keys(roots).length > 1) {
    errors['E4'] = true;
  } else if (!Object.keys(roots).length) {
    errors['E3'] = true;
  }

  Object.keys(roots).forEach(function(root){
    var visited = {};
    var queue = [];
    root = nodes[root];

    queue.push(root);

    while(queue.length) {
      root = queue.shift();
      if (!visited[root.data]) {
        visited[root.data] = true;
        root.children.forEach(function(child) {
          queue.push(child);
        });
      } else {
        errors['E3'] = true;
        return;
      }
    }
  });

  if (Object.keys(errors).length) {
    return Object.keys(errors).sort() + ":" + inputData;
  } else {
    return "SUCCESS:" + inputData;
  }

}

console.log(isTree('(A B)(A C)(B D)(D C)'));