import {createNode} from './nodeCreator';

function buildToolbar() {
    if (document.querySelector('.toolbar') === null) {
        createNode('.ol-overlaycontainer-stopevent', 'div', ['toolbar']);
    }
}

function addBaseLayerButton(layerCollection) {
    buildToolbar();
    createNode('.toolbar', 'div', ['baselayer-button-container']);
    let i = 1;
    let layers = layerCollection.array_.filter(layer => layer.values_.isBaseLayer === true);
    layers.forEach(layer => {
        let layerTitle = layer.get('title');
        let layerId = layer.ol_uid;
        createNode('.baselayer-button-container', 'div', ['baselayer-button', `baselayer-${layerId}`, layerTitle.toLowerCase().replace(' ','_'),],'',[{'title': 'Klik hier voor de ' + layerTitle + ' achtergrondkaart'}]);
        let layerButton =  document.querySelector(`.baselayer-${layerId}`);
        layerButton.addEventListener('click', () => {
            let otherLayers = layers.filter(thisLayer => thisLayer !== layer);
            otherLayers.forEach(otherLayer => {otherLayer.setVisible(false);});
            layer.setVisible(true);
            let buttons = Array.from(document.querySelectorAll('.baselayer-button'));
            let otherButton = buttons.filter(thisButton => thisButton !== layerButton)[0];
            if (layerButton.classList.contains('active') === false) {
                layerButton.classList.add('active');
                otherButton.classList.remove('active');
            }
        });
        i === 1 ? layerButton.classList.add('active') : false;
        i++;
    });
}

function addToolbarButton() {
    buildToolbar();
}
export {buildToolbar, addBaseLayerButton, addToolbarButton};