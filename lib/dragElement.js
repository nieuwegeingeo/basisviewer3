function dragElement(element) {
    let parentNode = element.parentNode;
    let originalPosX = parentNode.offsetTop;
    let originalPosY = parentNode.offsetLeft;
    element.addEventListener('mousedown', function clickEle(e) {
        e = e || window.event;
        //pauseEvent(e);
        let initialX = e.screenX;
        let initialY = e.screenY;
        console.log(initialX,initialY )
        let popupX = parentNode.offsetTop;
        let popupY = parentNode.offsetLeft;
        console.log(popupX,popupY )
        document.addEventListener('mousemove', function mouseDoc(e) {
            let offsetX = initialX - e.screenX;
            let offsetY = initialY - e.screenY;
            let moveX = popupX - offsetX;
            let moveY = popupY - offsetY;
            console.log(moveX,moveY)
            // $('.form-pos__container').offset({
            //     top: moveY,
            //     left: moveX
            // });
            parentNode.style.top = moveY + 'px';
            parentNode.style.left = moveX + 'px';
        });
        element.classList.add('drag-active');
        document.addEventListener('mouseup', function removeListner(e) {
            popupX = parentNode.offsetTop;
            popupY = parentNode.offsetLeft;
            let docX = document.documentElement.clientWidth;
            let docY = document.documentElement.clientHeight;
            let popupW = $('.form-pos__container').width();
            checkPos(popupW, popupX, popupY, docX, docY);
            document.removeEventListener('mousemove', mouseDoc, false);
            document.removeEventListener('mouseup', removeListner, false);
            $('.drag-bar').removeClass('drag-active');
        });
        $('.drag-bar').on("dblclick", function () {
            $('.form-pos__container').offset({
                top: originalPosY,
                left: originalPosX
            });

        });
    });
}

function elementDrag(e) {

}

function dragbarLogic() {

}

function checkPos(pW, pX, pY, dX, dY) {
    if (pX + 50 > dX && pY + 50 > dY) {
        $('.form-pos__container').offset({
            top: dY - 50,
            left: dX - 50
        });
    } else if (pX + 50 > dX) {
        $('.form-pos__container').offset({
            top: pY,
            left: dX - 50
        });
    } else if (pY + 50 > dY) {
        $('.form-pos__container').offset({
            top: dY - 50,
            left: pX
        });
    } else if (pX + pW - 50 < 0) {
        $('.form-pos__container').offset({
            top: pY,
            left: 0 - pW + 50
        });
    } else if (pY < 0) {
        $('.form-pos__container').offset({
            top: 0,
            left: pX
        });
    }
}

export {dragElement};