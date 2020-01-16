import {createNode, removeNode} from './nodeCreator';

function createSidebar(hideSidebar) {

    createNode('.ol-overlaycontainer-stopevent','div',['sidebar','ol-control','ol-unselectable']);
    createNode('.sidebar','button',['sidebar-button'],'◀',[{'title':'Zijbalk'}]);
    createNode('.sidebar','div',['sidebar-head']);
    createNode('.sidebar','div',['sidebar-body']);
    createNode('.sidebar-head','span',[],'Informatie');
    // createNode('.sidebar-toggle','span',['sidebar-toggle-text']);

    let sidebar = document.querySelector('.sidebar');
    let sidebarButton = document.querySelector('.sidebar-button');

    hideSidebar === true ? sidebar.classList.add('ol-collapsed') :false;
    hideSidebar === true ? sidebarButton.innerHTML = 'Informatie' :false;
    sidebarButton.addEventListener('click', sidebarToggle);

}

function sidebarToggle() {
    let sidebar = document.querySelector('.sidebar');
    let sidebarButton = document.querySelector('.sidebar-button');
    if (sidebar.classList.contains('ol-collapsed')) {
        sidebar.classList.remove('ol-collapsed');
        sidebarButton.classList.remove('ol-collapsed');
        sidebarButton.innerHTML = '◀';
    } else {
        sidebar.classList.add('ol-collapsed');
        sidebarButton.classList.add('ol-collapsed');
        sidebarButton.innerHTML = 'Informatie';
    }
}
export {createSidebar, sidebarToggle};