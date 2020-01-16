import {createNode,removeNode} from './nodeCreator';

function createLayerFilter(layers) {
    layers.forEach(layer => {
        let layerId = layer.ol_uid;
        let parentNode = document.querySelector(`.layer-li-${layerId} .layermanager-item-container`);
        let filterButton = document.createElement('div');
        let filter = layer.values_.filter;
        if (filter !== undefined) {
            filterButton.classList.add(`layer-filter-button`, `input-filter-${layerId}`);
            document.getElementsByClassName('filter-container').length === 0 ?  createNode('.ol-overlaycontainer-stopevent', 'div',['filter-container','ol-control','ol-collapsed']) : false;
            createNode('.filter-container','div',['layer-filter', `filter-${layerId}`, 'ol-collapsed']);
            createNode(`.filter-${layerId}`,'div',['filter-button-container', `button-container-${layerId}`]);
            createNode(`.button-container-${layerId}`,'button',['filter-button','filter-button-confirm',`button-confirm-${layerId}`],`Filter`);
            createNode(`.button-container-${layerId}`,'button',['filter-button','filter-button-reset',`button-reset-${layerId}`],`Wis`);
            createNode(`.button-container-${layerId}`,'button',['filter-button','filter-button-cancel',`button-cancel-${layerId}`],`Annuleer`);

            createFilterContent(layerId,filter);

            let cancelButton = document.querySelector(`.button-cancel-${layerId}`);
            filterButton.addEventListener('click', function () {
                openFilter(layer, filterButton);
            });
            cancelButton.addEventListener('click', function () {
                document.querySelector(`.filter-container`).classList.add('ol-collapsed');
                document.querySelectorAll(`.layer-filter`).forEach(fl => {
                    fl.classList.add('ol-collapsed');
                });
            });

        } else {
            filterButton.classList.add(`filter-filler`, `input-filter-${layerId}`);
        }
        parentNode.insertBefore(filterButton, parentNode.firstChild);


    });
    document.querySelectorAll('.layer-filter').length === 0 ? removeNode('.filter-filler', true) : false;
}

function openFilter(layer, filterButton) {
    let layerId = layer.ol_uid;
    let filter = layer.values_.filter;
    let filterBody = document.querySelector(`.filter-${layerId}`);
    let filterContainer = document.querySelector('.filter-container');

    if (filterContainer.classList.contains('ol-collapsed')) {
        filterContainer.classList.remove('ol-collapsed');
        filterBody.classList.remove('ol-collapsed');
    } else {
        filterContainer.classList.add('ol-collapsed');
        document.querySelectorAll(`.layer-filter`).forEach(fl => {
            fl.classList.add('ol-collapsed');
        });
    }
    console.log(filter, filterButton);
    filter.forEach(filterItem => {
        for (let key in filterItem) {
            console.log(key);
        }
    });
}
function createFilterContent(layerId,filter) {

}
export {createLayerFilter};