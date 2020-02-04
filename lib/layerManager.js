import {createNode, removeNode} from './nodeCreator';
import {createLayerLegend, createExtraLegend} from './legendCreator';
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
    let container = createNode('.ol-overlaycontainer-stopevent', 'div', ['layermanager-container','ol-control','ol-unselectable']);
    let layermanagerButton = createNode('.layermanager-container', 'button', ['layermanager-button','layermanager-arrow'],'&#9654;',[{'title':'Kaartlagen'}]);
    let head = createNode('.layermanager-container', 'div', ['layermanager-head']);
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

    // Opens or collapses the layermanager //
    layermanagerButton.addEventListener('click', () => {
        if (container.classList.contains('ol-collapsed')) {
            container.classList.remove('ol-collapsed');
            layermanagerButton.innerHTML = '&#9654;';
        } else {
            container.classList.add('ol-collapsed');
            layermanagerButton.innerHTML = 'Lagen';
        }
    });
    // Remove all infobutton-fillers if there are only fillers //
    document.querySelectorAll('.layermanager-info-button').length === 0 ? removeNode('.layermanager-info-filler', true) : false;
}

// Add an item to the layermanager //
function createLayerManagerItem(layer, map) {
    let layerTitle = layer.get('title');
    let layerId = layer.ol_uid;
    let listItem = createNode('.layermanager-list', 'li', ['layermanager-item', `layer-li-${layerId}`]);
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
    // Create feature info toggle buttons //
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
    // Disables a layermanager item if current scale is bigger than the viewscale in settings //
    map.on('moveend', function() {
        if  (getScale(map) > layerScale) {
            listItem.classList.add('disabled');
        }else {
            listItem.classList.remove('disabled');
        }
    });
}

export {buildLayerManager, createLayerManagerItem};