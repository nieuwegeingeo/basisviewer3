import {createNode,removeNode} from './nodeCreator';
import {dragElement} from './dragElement';
import {equalTo as equalToFilter,like as likeFilter,and as andFilter} from 'ol/format/filter';
import {getLayerByUid} from './layerSelection';

// function to create a filter for each entry in the layermanager //
function createLayerFilter(layers) {
    // Object to store filter values //
    GeoApp.filter = {};

    // Create one container for all filters //
    let filterContainer = createNode('.ol-overlaycontainer-stopevent', 'div',['filter-container','ol-control','ol-collapsed']);
    let dragBar = createNode('.filter-container','div',['filter-container-dragbar']);

    // Loop through each layer //
    layers.forEach(layer => {
        let layerId = layer.ol_uid;
        let parentNode = document.querySelector(`.layer-li-${layerId} .layermanager-item-container`);
        let filterButton = document.createElement('div');
        let filterArray = layer.values_.filter;
        let layerFilter = GeoApp.filter[layerId] = {};

        // Check if a filter is defined //
        if (filterArray !== undefined) {
            // Builds the filter body for each layer, display is managed by the ol-collapsed class //
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
            // For each key in the layer filter object add the correct strings to the filterContent variable //
            for (let key in filter) {
                layerFilter[key] = '';
                i !== 0 ? filterContent += `
                    <br><div class="and_or_container">
                    <span>En:</span><input type="radio" class="and_or" name="and_or_${layerId}_${i}" value="AND" checked>
                    <span>Of:</span><input type="radio" class="and_or" name="and_or_${layerId}_${i}" value="OR">
                    </div>`: false;

                if (filter[key].TYPE.toLowerCase() === 'text') {
                    let val = filter[key].VALUE !== undefined ? filter[key].VALUE : '';
                    filterContent += `<br><label class="filter-item"><span class="filter-item-title">${filter[key].TITLE}:</span><input class="filter-input-text" name="${key}" type="${filter[key].TYPE}" value="${val}"></label>`;
                } else if (filter[key].TYPE.toLowerCase() === 'checkbox') {
                    filterContent += `<br><div class="filter-checkbox-container"><span class="filter-item-title">${filter[key].TITLE}: </span>`;
                    for (let z=0;z<filter[key].OPTIONS.length;z++) {
                        filter[key].OPTIONS[z].isnull === true ? filter[key].OPTIONS[z].value += '__isnull' : false;
                        let sel = filter[key].OPTIONS[z].selected === true ? 'checked' : '';
                        filterContent += `<label class="filter-checkbox-label">${filter[key].OPTIONS[z].title}: <input type="checkbox"  class="filter-input-checkbox" name="${key}" value="${filter[key].OPTIONS[z].value}" ${sel}></label>`;
                    }
                    filterContent += `</div>`;
                } else if (filter[key].TYPE.toLowerCase() === 'select') {
                    filterContent += `
                        <br><div class="filter-item">
                        <span class="filter-item-title">${filter[key].TITLE}: </span>
                        <select class="filter-input-select" name="${key}"><option value=""></option>
                        `;
                    for (let z=0;z<filter[key].OPTIONS.length;z++) {
                        filter[key].OPTIONS[z].isnull === true ? filter[key].OPTIONS[z].value += '__isnull' : false;
                        let sel = filter[key].OPTIONS[z].selected === true ? 'selected' : '';
                        filterContent += `<option value="${filter[key].OPTIONS[z].value}" ${sel}>${filter[key].OPTIONS[z].title}</option>`;
                        //filterContent += `<label class="filter-checkbox-label">${filter[key].OPTIONS[z].title}: <input type="checkbox"  class="filter-input-checkbox" name="${key}" value="${filter[key].OPTIONS[z].value}"></label>`;
                    }
                    //console.log(filterContent);
                    filterContent += `</select></div>`;
                    //console.log('select');
                }
                i++;
            }
            // Add fill the filter body with the filterContent variable //
            filterBody.innerHTML = filterContent;

            // Disable the and/or selector for empty inputs and set filter on typing or changing //
            let filterNodes = document.querySelectorAll(`.filter-body-${layer.ol_uid} input, .filter-body-${layer.ol_uid} select`);
            filterNodes.forEach(function(node) {
                if (node.type === 'text') {
                    node.addEventListener('keyup', function() {
                        setAndOr(node);
                        setFilter(layer,filterButton);
                    }, false);

                } else {
                    node.addEventListener('change', function() {
                        setAndOr(node);
                        setFilter(layer,filterButton);
                    }, false);
                }

                // node.type === 'text' ? node.addEventListener('keyup', setAndOr, false) : node.addEventListener('change', setAndOr, false);
                setAndOr(node);
                setFilter(layer,filterButton);
            });
            // Add function to the open button //
            filterButton.addEventListener('click', function () {
                openFilter(layer, filterButton);
            });
            // Add function to the filter button //
            confirmButton.addEventListener('click', function() {
                setFilter(layer,filterButton);
            });
            // Add function to the reset button //
            resetButton.addEventListener('click', function() {
                clearFilter(layer,filterButton);
            });
            // Add function to the close button //
            closeButton.addEventListener('click', function () {
                closeFilterPopup();
            });
            // Add
            layer.getSource().params_.CQL_FILTER !== undefined ? filterButton.classList.add('filter-on') : false ;
        } else {
            // If no filter is defined for the layer insert a filler element for correct spacing //
            filterButton.classList.add(`filter-filler`, `input-filter-${layerId}`);
        }
        // Insert the button before the first element in the layermanager //
        parentNode.insertBefore(filterButton, parentNode.firstChild);
    });
    // Add a dragbar to the filter container
    dragElement(dragBar);
    // Remove all fillers if there are no filters //
    document.querySelectorAll('.layer-filter').length === 0 ? removeNode('.filter-filler', true) : false;
}

// Open the filter for the correct layer //
function openFilter(layer, filterButton) {
    let layerId = layer.ol_uid;
    let filterId = 'filter-' + layerId;
    let filterObj = GeoApp.filter[layer.ol_uid];
    let filter = layer.values_.filter;
    let filterBody = document.querySelector(`.filter-${layerId}`);
    let filterContainer = document.querySelector('.filter-container');
    // Open or close the container based on the ol-collapsed class, if the container is open and another filter is clicked it replaces the body //
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
    // Set the initial filter based on the filter object //
    for (let key in filterObj) {
        let value = filterObj[key];
        if (value !== '') {
            if (typeof value === 'string'){
                document.querySelector(`[name=${key}]`).value = value;
            }else if (Array.isArray(value)) {
                value.forEach(function(val) {
                    document.querySelectorAll(`[name=${key}]`).forEach(function(node) {
                        if (val === node.value) {
                            node.checked = true;
                        }
                    });
                });
            }
        }
    }

}

// Sets the CQL filter on the layer //
function setFilter(layer, filterButton) {
    let layerId = layer.ol_uid;
    let filterObj = GeoApp.filter[layer.ol_uid];
    let filterItems = document.querySelectorAll(`.filter-body-${layer.ol_uid} input, .filter-body-${layer.ol_uid} select`);
    for (let key in filterObj) {filterObj[key] = '';}
    // Add  filter variables to the filter object //
    filterItems.forEach(function(node, index) {
        // Add different key-values based on the input type //
        if (node.classList.contains('filter-input-text')) {
            // Add a string for text input //
            let val = node.value;
            filterObj[node.name] = val;
        } else if (node.classList.contains('filter-input-checkbox')) { // && node.checked === true) {
            // Add an array string for checkbox input //
            let val = [];
            let checkedNodes = document.querySelectorAll('[name='+node.name+']:checked');
            checkedNodes.forEach(function(checked, index) {
                val.push(checked.value);
            });
            filterObj[node.name] = val;
        } else if (node.classList.contains('filter-input-select')) {
            let val = node.value;
            filterObj[node.name] = val;
        }

    });
    let i = 0;
    let n = 0;
    let CQL = '';
    // Loop through all the items in the filter object and set the CQL parameter //
    for (let key in filterObj) {
        let value = filterObj[key];
        if (i === 0) {
            if (value === '') {
                n++;
                continue;
            } else {
                if (typeof value === 'string') {
                    // If it's a string, use the LIKE operator //
                    if (value.match('__isnull')) {
                        // On an isnull value set KEY IS NULL //
                        CQL += `(strToLowerCase(${key}) LIKE '%${value.toLowerCase().replace(/__isnull/g,'')}%' OR ${key} IS NULL)`;
                    } else {
                        CQL += `strToLowerCase(${key}) LIKE '%${value.toLowerCase()}%'`;
                    }
                } else if (Array.isArray(value)) {
                     // If it's checkboxes, use the IN operator //
                    let inVal = ``;
                    if (value.length > 0) {
                        value.forEach(function(val,ind) {
                            val = val.replace(/__isnull/g,'');
                            ind === 0 ? inVal = `'${val}'` : inVal += `,'${val}'`;
                        });
                    } else {
                        inVal = `''`;
                    }
                    value.find(val => val.match('__isnull')) !== undefined ? CQL = `(strToLowerCase(${key}) IN (${inVal.toLowerCase()}) OR ${key} IS NULL )` : CQL = `strToLowerCase(${key}) IN (${inVal.toLowerCase()})`;
                }
            }
        } else {
            if (value === '') {
                i++;
                n++;
                continue;
            } else {
                // Check the clicked And/Or elements and set the correct operator //
                let andOrNodes = document.querySelectorAll(`input[name="and_or_${layerId}_${n}"]`);
                let andOr = '';
                andOrNodes.forEach(function(node,index) {
                    if (node.checked) {andOr = node.value;}
                });
                // Add to the CQL string and use the correct operator //
                if (typeof value === 'string') {
                    if (value.match('__isnull')) {
                        CQL += ` ${andOr} (strToLowerCase(${key}) LIKE '%${value.toLowerCase().replace(/__isnull/g,'')}%' OR ${key} IS NULL)`;
                    } else {
                        CQL += ` ${andOr} strToLowerCase(${key}) LIKE '%${value.toLowerCase()}%'`;
                    }
                    //CQL += ` ${andOr} strToLowerCase(${key}) LIKE '%${value.toLowerCase()}%'`;
                } else if (Array.isArray(value)) {
                    let inVal = ``;
                    if (value.length > 0) {
                        value.forEach(function(val,ind) {
                            val = val.replace(/__isnull/g,'');
                            ind === 0 ? inVal = `'${val}'` : inVal += `,'${val}'`;
                        });
                    } else {
                        inVal = `''`;
                    }
                    value.find(val => val.match('__isnull')) !== undefined ? CQL += ` ${andOr} (strToLowerCase(${key}) IN (${inVal.toLowerCase()}) OR ${key} IS NULL )` : CQL += ` ${andOr} strToLowerCase(${key}) IN (${inVal.toLowerCase()})`;
                }
            }
        }
        n++;
        i++;
    }
    // Set the CQL filter, if the string is empty set the parameter to undefined to make sure the layer stays loaded //
    layer.getSource().params_.CQL_FILTER = CQL === '' ? undefined : CQL;
    layer.getSource().refresh();
    layer.values_.wfsLayerID !== undefined ? filterWFSLayer(layer, filterObj) : false;
    // Set the button fill if there's a filter on the layer //
    layer.getSource().params_.CQL_FILTER !== undefined ? filterButton.classList.add('filter-on') : filterButton.classList.remove('filter-on');
}

// Clears the filter and sets the parameter to undefined //
function clearFilter(layer, filterButton) {
    let filterObj = GeoApp.filter[layer.ol_uid];
    let filterItems = document.querySelectorAll(`.filter-body-${layer.ol_uid} input:not(.and_or), .filter-body-${layer.ol_uid} select`);
    filterItems.forEach(function(node) {
        if (node.classList.contains('filter-input-text')) {
            node.value = '';
        } else if (node.classList.contains('filter-input-checkbox')) {
            node.checked = true;
        } else if (node.classList.contains('filter-input-select')) {
            node.childNodes.forEach(function(cNode) {
                cNode.value === '' ? cNode.selected = true : false;
            });
        }
        filterObj[node.name] = '';
    });
    layer.getSource().params_.CQL_FILTER = undefined;
    layer.getSource().refresh();
    layer.getSource().params_.CQL_FILTER !== undefined ? filterButton.classList.add('filter-on') : filterButton.classList.remove('filter-on');
}

// Closes the container //
function closeFilterPopup() {
    document.querySelector(`.filter-container`).classList.add('ol-collapsed');
    document.querySelectorAll(`.layer-filter`).forEach(fl => {
        fl.classList.add('ol-collapsed');
    });
}

function setAndOr(n) {
    let node = n.timeStamp !== undefined ? this : n;
    if (node.type === 'text') {
        let prevAndOr = node.parentElement.previousElementSibling.previousElementSibling;
        if (prevAndOr.classList.contains('and_or_container')) {
            node.value === '' ? prevAndOr.classList.add('disabled') : prevAndOr.classList.remove('disabled');
        }
    }
}

function filterWFSLayer(layer, filterObj) {
    let layerId = layer.ol_uid;
    let wfsLayerID = layer.values_.wfsLayerID;
    let wfsLayer = getLayerByUid(GeoApp.layers, wfsLayerID);
    console.log(filterObj);
}

export {createLayerFilter};