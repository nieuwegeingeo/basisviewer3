import {createNode} from './nodeCreator';

// Create a toolbar where buttons can be added //
function buildToolbar() {
    if (document.querySelector('.toolbar') === null) {
        createNode('.ol-overlaycontainer-stopevent', 'div', ['toolbar']);
    }
}

// Add baselayer buttons to the toobar //
function addBaseLayerButton(layer,layerCollection){
    buildToolbar();
    if (document.querySelector('.baselayer-button-container') === null) {createNode('.toolbar', 'div', ['baselayer-button-container']);}

    let i = layerCollection.array_.filter(layer => layer.values_.isBaseLayer === true).length;
    let layers = [];
    let layerTitle = layer.get('title');
    let layerId = layer.ol_uid;
    createNode('.baselayer-button-container', 'div', ['baselayer-button', `baselayer-${layerId}`, layerTitle.toLowerCase().replace(/ /g,'_'),],'',[{'title': 'Klik hier voor de ' + layerTitle + ' achtergrondkaart'}]);
    let layerButton =  document.querySelector(`.baselayer-${layerId}`);
    layerButton.addEventListener('click', () => {
        layers = GeoApp.layers.array_.filter(layer => layer.values_.isBaseLayer === true);
        let otherLayers = layers.filter(thisLayer => thisLayer.ol_uid !== layer.ol_uid);
        otherLayers.forEach(otherLayer => {otherLayer.setVisible(false);});
        layer.setVisible(true);
        let buttons = Array.from(document.querySelectorAll('.baselayer-button'));
        let otherButton = buttons.filter(thisButton => thisButton !== layerButton)[0];
        if (layerButton.classList.contains('active') === false) {
            layerButton.classList.add('active');
            otherButton.classList.remove('active');
        }
    });
    if (i === 1) {
        layerButton.classList.add('active');
        layer.setVisible(true);
    }
}

// Adds a button to the toolbar //
function addToolbarButton() {
    buildToolbar();
}
export {buildToolbar, addBaseLayerButton, addToolbarButton};