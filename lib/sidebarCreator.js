import {createNode, removeNode} from './nodeCreator';

// Function to create the sidebar //
function createSidebar(hideSidebar) {
    let sidebar = createNode('.ol-overlaycontainer-stopevent','div',['sidebar','ol-control','ol-unselectable']);
    let sidebarButton = createNode('.sidebar','button',['sidebar-button'],'',[{'title':'Zijbalk'}]);
    createNode('.sidebar','div',['sidebar-head']);
    createNode('.sidebar','div',['sidebar-body']);
    createNode('.sidebar-head','span',[],'Informatie');

    hideSidebar === true ? sidebar.classList.add('ol-collapsed') :false;
    //hideSidebar === true ? sidebarButton.innerHTML = 'Informatie' :false;
    sidebarButton.addEventListener('click', sidebarToggle);
}

// Function to open or close the sidebar //
function sidebarToggle() {
    let sidebar = document.querySelector('.sidebar');
    let sidebarButton = document.querySelector('.sidebar-button');
    if (sidebar.classList.contains('ol-collapsed')) {
        sidebar.classList.remove('ol-collapsed');
        sidebarButton.classList.remove('ol-collapsed');
        //sidebarButton.innerHTML = '◀';
    } else {
        sidebar.classList.add('ol-collapsed');
        sidebarButton.classList.add('ol-collapsed');
        //sidebarButton.innerHTML = 'Informatie';
    }
}
export {createSidebar, sidebarToggle};