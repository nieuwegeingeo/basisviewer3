import {createNode, removeNode} from './nodeCreator';
import {createLayerLegend} from './legendCreator';
import {getScale} from './projectionSetter';
import {createLayerFilter} from './filter';

// Build a layermanager and fill with layers //

function buildLayerManager(layerCollection, map) {
    // Filter out the baselayers and hidden layers//
    let layers = layerCollection.array_
        .filter((layer) => { return layer.values_.isBaseLayer !== true;})
        .filter(hlayer => hlayer.values_.hideInLayerManager !== true);

    // Stop function if no layers present //
    if (layers.length === 0) {return false;}

    // Create the DOM elements //
    createNode('.ol-overlaycontainer-stopevent', 'div', ['layermanager-container','ol-control','ol-unselectable']);
    createNode('.layermanager-container', 'button', ['layermanager-button','layermanager-arrow'],'&#9654;',[{'title':'Kaartlagen'}]);
    createNode('.layermanager-container', 'div', ['layermanager-head']);
    createNode('.layermanager-container', 'div', ['layermanager-body']);
    createNode('.layermanager-head', 'span', [],'Kaartlagen ');
    createNode('.layermanager-body', 'ul', ['layermanager-list']);

    // Create a li item for every layer //
    layers.forEach(layer => {
        if (layer.values_.isBaseLayer === undefined || layer.values_.isBaseLayer === false) {
            createLayerManagerItem(layer, map);
        }
    });
    createLayerFilter(layers);
    let head = document.querySelector('.layermanager-head');
    let containerClasslist = document.querySelector('.layermanager-container').classList;
    let buttonClasslist = document.querySelector('.layermanager-button').classList;

    let layermanagerButton = document.querySelector('.layermanager-button');
    layermanagerButton.addEventListener('click', () => {
        if (containerClasslist.contains('ol-collapsed')) {
            containerClasslist.remove('ol-collapsed');
            layermanagerButton.innerHTML = '&#9654;';
        } else {
            containerClasslist.add('ol-collapsed');
            layermanagerButton.innerHTML = 'Lagen';
        }
    });
    document.querySelectorAll('.layermanager-info-button').length === 0 ? removeNode('.layermanager-info-filler', true) : false;
}

function createLayerManagerItem(layer, map) {
    let layerTitle = layer.get('title');
    let layerId = layer.ol_uid;
    createNode('.layermanager-list', 'li', ['layermanager-item', `layer-li-${layerId}`]);
    let listItem = document.querySelector(`.layer-li-${layerId}`);
    let visible = layer.getVisible() === true ? 'checked' : '';
    let layerScale = layer.values_.layerScale;
    let infobutton = layer.values_.wmsinfoformat !== undefined ?
        `<div class="layermanager-info-button layer-info-${layerId}">i</div>` : `<div class="layermanager-info-filler"></div>`;

        listItem.innerHTML = `
        <div class="layermanager-item-container">${infobutton}
        <label>
        <input class="layer-input layer-input-${layerId} name="layer-${layerId}" type="checkbox" ${visible}>${layerTitle}
        </label></div>`;
    let checkbox = document.querySelector(`.layer-input-${layerId}`);
    let infoButton = document.querySelector(`.layer-info-${layerId}`);
    // Set layer visibility checkbox function//
    checkbox.addEventListener('click', () => {
        checkbox.checked === true ? layer.setVisible(true) : layer.setVisible(false);
    });
    if (layer.values_.wmsinfoformat !== undefined) {
        layer.values_.wmsinfoformat !== undefined ? infoButton.classList.add('info-on'): false;
        infoButton.addEventListener('click', () => {
            if (infoButton.classList.contains('info-on')) {
                infoButton.classList.remove('info-on');
                layer.values_.wmsinfoformat = '';
            } else {
                infoButton.classList.add('info-on');
                layer.values_.wmsinfoformat = 'application/vnd.ogc.gml';
            }
        });
    }
    if (layer.values_.legend !== undefined) {
        createLayerLegend(listItem, layer, map);
    }
    map.on('moveend', function() {
        if  (getScale(map) > layerScale) {
            listItem.classList.add('disabled');
        }else {
            listItem.classList.remove('disabled');
        }
    });
}

export {buildLayerManager, createLayerManagerItem};