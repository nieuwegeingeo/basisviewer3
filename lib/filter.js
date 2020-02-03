import {createNode,removeNode} from './nodeCreator';
import {dragElement} from './dragElement';

function createLayerFilter(layers) {
    GeoApp.filter = {};
    //document.getElementsByClassName('filter-container').length === 0 ?  createNode('.ol-overlaycontainer-stopevent', 'div',['filter-container','ol-control','ol-collapsed']) : false;
    let filterContainer = createNode('.ol-overlaycontainer-stopevent', 'div',['filter-container','ol-control','ol-collapsed']);
    let dragBar = createNode('.filter-container','div',['filter-container-dragbar']);
    layers.forEach(layer => {
        let layerId = layer.ol_uid;
        let parentNode = document.querySelector(`.layer-li-${layerId} .layermanager-item-container`);
        let filterButton = document.createElement('div');
        let filterArray = layer.values_.filter;
        let layerFilter = GeoApp.filter[layerId] = {};
        if (filterArray !== undefined) {
            filterButton.classList.add(`layer-filter-button`, `input-filter-${layerId}`);
            createNode('.filter-container','div',['layer-filter', `filter-${layerId}`, 'ol-collapsed']);
            createNode(`.filter-${layerId}`,'div',['filter-button-container', `button-container-${layerId}`]);
            let confirmButton = createNode(`.button-container-${layerId}`,'button',['filter-button','filter-button-confirm',`button-confirm-${layerId}`],`Filter`);
            let resetButton = createNode(`.button-container-${layerId}`,'button',['filter-button','filter-button-reset',`button-reset-${layerId}`],`Wis`);
            let closeButton = createNode(`.button-container-${layerId}`,'button',['filter-button','filter-button-cancel',`button-cancel-${layerId}`],`Sluit`);
            let filterBody = createNode(`.filter-${layerId}`,'div',[`filter-body-${layerId}`,'filter-body']);
            let filterContent = `<div class='filter-title'><p>Filter voor: ${layer.values_.title}</p></div>`;
            let filter = filterArray[0];
            let i = 0;
            for (let key in filter) {
                layerFilter[key] = '';
                i !== 0 ? filterContent += `
                    <br><div class="and_or_container">
                    <span>En:</span><input type="radio" class="and_or" name="and_or_${layerId}_${i}" value="AND" checked>
                    <span>Of:</span><input type="radio" class="and_or" name="and_or_${layerId}_${i}" value="OR">
                    </div>`: false;

                if (filter[key].TYPE.toLowerCase() === 'text') {
                    filterContent += `<br><label class="filter-item">${filter[key].TITLE}: <input class="filter-input filter-input-text" name="${key}" type="${filter[key].TYPE}"></label>`;
                } else if (filter[key].TYPE.toLowerCase() === 'checkbox') {
                    console.log(filter[key]);
                    filterContent += `<br><div class="filter-checkbox-container">`;
                    for (let z=0;z<filter[key].OPTIONS.length;z++) {
                        console.log(filter[key].OPTIONS[z]);
                        filterContent += `<label class="filter-item">${filter[key].OPTIONS[z].title}: <input type="checkbox" name="filter-checkbox-${filter[key].TITLE}" value="${filter[key].OPTIONS[z].value}"></label>`;
                    }
                    filterContent += `</div>`;
                    console.log(filterContent)
                } else if (filter[key].TYPE.toLowerCase() === 'select') {
                    console.log('select');
                }
                i++;
            }

            filterBody.innerHTML = filterContent;
            createFilterContent(layerId,filter);

            filterButton.addEventListener('click', function () {
                openFilter(layer, filterButton);
            });

            confirmButton.addEventListener('click', function() {
                setFilter(layer,filterButton);
            });
            resetButton.addEventListener('click', function() {
                clearFilter(layer,filterButton);
            });
            closeButton.addEventListener('click', function () {
                closeFilterPopup();
            });

            layer.getSource().params_.CQL_FILTER !== undefined ? filterButton.classList.add('filter-on') : false ;
        } else {
            filterButton.classList.add(`filter-filler`, `input-filter-${layerId}`);
        }
        parentNode.insertBefore(filterButton, parentNode.firstChild);
    });
    dragElement(dragBar);
    document.querySelectorAll('.layer-filter').length === 0 ? removeNode('.filter-filler', true) : false;
}

function openFilter(layer, filterButton) {
    let layerId = layer.ol_uid;
    let filterId = 'filter-' + layerId;
    let filterObj = GeoApp.filter[layer.ol_uid];
    let filter = layer.values_.filter;
    let filterBody = document.querySelector(`.filter-${layerId}`);
    let filterContainer = document.querySelector('.filter-container');
    if (filterContainer.classList.contains('ol-collapsed')) {
        filterContainer.classList.remove('ol-collapsed');
        filterBody.classList.remove('ol-collapsed');
    } else {
        let openFilter = document.querySelector(`.layer-filter:not(.ol-collapsed)`);
        if (openFilter.classList.contains(filterId)) {
            filterContainer.classList.add('ol-collapsed');
            document.querySelectorAll(`.layer-filter`).forEach(fl => {
                fl.classList.add('ol-collapsed');
            });
        } else {
            openFilter.classList.add('ol-collapsed');
            filterBody.classList.remove('ol-collapsed');
        }
    }
    filter.forEach(filterItem => {
        for (let key in filterItem) {
            //console.log(key);
        }
    });
}

function setFilter(layer, filterButton) {
    let layerId = layer.ol_uid;
    let filterObj = GeoApp.filter[layer.ol_uid];
    let filterItems = document.querySelectorAll(`.filter-body-${layer.ol_uid} input`);
    filterItems.forEach(function(node, index) {
        if (node.classList.contains('filter-input')) {
            let val = node.value;
            filterObj[node.name] = val;
        }
    });
    let i = 0;
    let n = 0;
    let CQL = '';
    for (let key in filterObj) {
        let value = filterObj[key].toLowerCase();
        if (i === 0) {
            if (value === '') {
                n++;
                continue;
            } else {
                CQL = `strToLowerCase(${key}) LIKE '%${value}%'`;
            }
        } else {
            if (value === '') {
                i++;
                n++;
                continue;
            } else {
                let andOrNodes = document.querySelectorAll(`input[name="and_or_${layerId}_${n}"]`);
                let andOr = '';
                andOrNodes.forEach(function(node,index) {
                    if (node.checked) {andOr = node.value;}
                });
                CQL += ` ${andOr} strToLowerCase(${key}) LIKE '%${value}%'`;
            }
        }
        n++;
        i++;
    }
    layer.getSource().params_.CQL_FILTER = CQL === '' ? undefined : CQL;
    layer.getSource().refresh();
    layer.getSource().params_.CQL_FILTER !== undefined ? filterButton.classList.add('filter-on') : filterButton.classList.remove('filter-on');
}

function clearFilter(layer, filterButton) {
    let filterObj = GeoApp.filter[layer.ol_uid];
    let filterItems = document.querySelectorAll(`.filter-body-${layer.ol_uid} input`);
    filterItems.forEach(function(node, index) {
        node.value = '';
        filterObj[node.name] = '';
    });
    layer.getSource().params_.CQL_FILTER = undefined;
    layer.getSource().refresh();
    layer.getSource().params_.CQL_FILTER !== undefined ? filterButton.classList.add('filter-on') : filterButton.classList.remove('filter-on');
}

function closeFilterPopup() {
    document.querySelector(`.filter-container`).classList.add('ol-collapsed');
    document.querySelectorAll(`.layer-filter`).forEach(fl => {
        fl.classList.add('ol-collapsed');
    });
}

function createFilterContent(layerId,filter) {

}

export {createLayerFilter};