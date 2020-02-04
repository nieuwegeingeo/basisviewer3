// Creates a node with the specified parameters //
function createNode(nodeTarget, nodeType, nodeClasses = [], innerText = '',attributes = []) {
    let target = document.querySelector(nodeTarget);
    let node = document.createElement(nodeType);
    // Adds classes to the node //
    if (nodeClasses.length > 0) {
        nodeClasses.forEach(c => {
            node.classList.add(c);
        });
    }
    // Adds attributes to the node //
    if (attributes.length > 0) {
        attributes.forEach(c => {
            for (let i in c) {
                node.setAttribute(i,c[i]);
            }
        });
    }
    // Append the node to the target //
    target.appendChild(node);
    if (innerText !== '') {node.innerHTML = innerText;}
    return node;
}

// Removes one specified node or all selected nodes //
function removeNode(nodeTarget, all) {
    if (all === true) {
        let targets = document.querySelectorAll(nodeTarget);
        targets.forEach(target => {
            target.parentNode.removeChild(target);
        });
    } else {
        let target = document.querySelector(nodeTarget);
        target.parentNode.removeChild(target);
    }
}

export {createNode, removeNode};