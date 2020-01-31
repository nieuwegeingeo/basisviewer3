function createNode(nodeTarget,nodeType , nodeClasses = [], innerText = '',attributes = []) {
    let target = document.querySelector(nodeTarget);
    let node = document.createElement(nodeType);
    if (nodeClasses.length > 0) {
        nodeClasses.forEach(c => {
            node.classList.add(c);
        });
    }
    if (attributes.length > 0) {
        attributes.forEach(c => {
            for (let i in c) {
                node.setAttribute(i,c[i]);
            }
        });
    }

    target.appendChild(node);
    if (innerText !== '') {node.innerHTML = innerText;}
    return node;
}

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