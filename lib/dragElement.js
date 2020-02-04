
// Makes elements draggable //
function dragElement(element) {
    let parentNode = element.parentNode;
    element.addEventListener('mousedown', function clickEle(e) {
        e = e || window.event;
        pauseEvent(e);
        let initialX = e.screenX;
        let initialY = e.screenY;
        let popupTop = parentNode.getBoundingClientRect().top;
        let popupLeft = parentNode.getBoundingClientRect().left;
        let popupW = parentNode.getBoundingClientRect().width;
        let popupH = parentNode.getBoundingClientRect().height;
        element.classList.add('drag-active');
        document.addEventListener('mousemove', function mouseDoc(e) {
            let offsetX = initialX - e.screenX;
            let offsetY = initialY - e.screenY;
            let moveX = (popupLeft + (popupW/2))- offsetX;
            let moveY = (popupTop + (popupH/2)) - offsetY;
            parentNode.style.top = moveY + 'px';
            parentNode.style.left = moveX + 'px';
            element.addEventListener('mouseup', function removeListner(e) {
                popupLeft = parentNode.getBoundingClientRect().top;
                popupTop = parentNode.getBoundingClientRect().left;
                checkPos(parentNode,popupW,popupH);
                document.removeEventListener('mousemove', mouseDoc, false);
                document.removeEventListener('mouseup', removeListner, false);
                element.classList.remove('drag-active');
            });
        });

    });
}

// Checks if the position is on-screen, if not snap back to the screen //
function checkPos(node,w,h) {
    let bound = node.getBoundingClientRect();
    let winW = window.innerWidth;
    let winH = window.innerHeight;
    if (bound.top < 0) {
        node.style.top = 0 + (h / 2) + 'px';
    }
    if (bound.left < 0) {
        node.style.left = 0 + (w / 2) + 'px';
    }
    if (bound.left + w > winW) {
        node.style.left = winW - (w / 2) + 'px';
    }
    if (bound.top + h > winH) {
        node.style.top = winH - (h / 2) + 'px';
    }
}

// Stop all other events on click //
function pauseEvent(e) {
    if (e.stopPropagation) e.stopPropagation();
    if (e.preventDefault) e.preventDefault();
    e.cancelBubble = true;
    e.returnValue = false;
    return false;
}

export {dragElement};