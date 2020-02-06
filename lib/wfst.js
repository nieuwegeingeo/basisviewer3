import {createNode,removeNode} from './nodeCreator';
import {Draw, Modify, Snap} from 'ol/interaction';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import {createLayer} from './layerCreator';
import {equalTo as equalToFilter,like as likeFilter,and as andFilter, or as orFilter} from 'ol/format/filter';
import {createLayerManagerItem} from './layerManager';
import { getLayerByUid } from './layerSelection';
import {addToolbarButton} from './toolbarCreator';


// Add wfst functions to the layer //
function createWFST(layers) {

    // Filter out the baselayers and hidden layers //
    let originLayers = layers.array_.filter(layer => layer.values_.isBaseLayer !== true && layer.values_.hideInLayerManager !== true);
    let layerArray = [];

    let draw = new Draw ({
        name: 'draw-interaction',
        source: '',
        type: 'Point',

    });
    //GeoApp.map.addInteraction(draw);
    //draw.setActive(false);
    GeoApp.draw = draw;

    originLayers.forEach(function(layer) {
        //
        let layerId = layer.ol_uid;
        let parentNode = document.querySelector(`.layer-li-${layerId} .layermanager-item-container`);
        let editButton = document.createElement('div');
        editButton.classList.add(`edit-filler`, `input-edit-${layerId}`);
        parentNode.insertBefore(editButton, parentNode.firstChild);

        if (layer.values_.editable === true ){
            editButton.classList.add(`layer-edit-button`);
            editButton.classList.remove(`edit-filler`);
            let layerOptions = {
                title: layer.values_.title + '_wfs',
                url: layer.getSource().getUrl().replace(/wms/g,'wfs'),
                options: {
                    format: 'wfs',
                    version: "1.1.0",
                    featureNS: 'http://www.nieuwegein.nl',
                    featureTypes: [layer.getSource().params_.LAYERS.split(':')[1]],
                    style: {
                        stroke: {
                            width: 1.5,
                            color: 'rgba(132,46,147,0.8)',
                        },
                        fill: {
                            color: '#842e934d',
                            //color: 'rgba(132,46,147,0.3)',
                        },
                        image: ({
                            radius: 7,
                            fill: new Fill({
                                color: '#842e934d'
                            }),
                            stroke: new Stroke ({
                                width: 1.5,
                                color: 'rgba(132,46,147,0.8)',
                            }),
                        }),
                    },
                    filter: andFilter (likeFilter('PROJECTCODE','RD%','%'),equalToFilter('JAAR','2018')),
                    visible: false,
                    zIndex: 5,
                },


            };
            console.log(layerOptions.url)
            let wfsLayer = createLayer(layerOptions, 'wfs');
            wfsLayer.values_.orgLayerID = layerId;
            layer.values_.wfsLayerID = wfsLayer.ol_uid;
            layerArray.push(wfsLayer);

            editButton.addEventListener('click', function() {
                editLayer(layer,editButton)
            });
        }
    });
    layerArray.forEach(layer => GeoApp.map.addLayer(layer));
    layerArray.forEach(layer => console.log(layer));

    layerArray.forEach(layer => createLayerManagerItem(layer, GeoApp.map));
    console.log(layerArray);
}

function editLayer(layer,editbutton) {
    let wfsLayerId = layer.values_.wfsLayerID;
    let wfsLayer = getLayerByUid(GeoApp.layers,wfsLayerId)[0];
    document.querySelector('.edit-buttons-container') !== null ? removeNode('.edit-buttons-container'): false;
    if (editbutton.classList.contains('edit-on')) {
        editbutton.classList.remove('edit-on');
        wfsLayer.setVisible(false);
        GeoApp.map.removeInteraction(GeoApp.draw);
        return;
    }
    if (document.querySelector('.edit-on') !== null) {
        GeoApp.layers.array_.forEach(function(layer){
            layer.values_.title.match(/_wfs/g) !== null? layer.setVisible(false) : false;
        });
        document.querySelector('.edit-on').classList.remove('edit-on');
        GeoApp.map.removeInteraction(GeoApp.draw);
    }

    editbutton.classList.toggle('edit-on');
    wfsLayer.setVisible(true);
    GeoApp.draw.on('drawend', drawEnd);
    GeoApp.draw.source_ = wfsLayer.getSource();
    GeoApp.map.addInteraction(GeoApp.draw);

    let drawButton = addToolbarButton('draw', 'edit-buttons');
    let editButton = addToolbarButton('draw', 'edit-buttons');
    let saveButton = addToolbarButton('draw', 'edit-buttons');
    console.log(drawButton)
    function drawEnd() {
        console.log('Draw end!')
    }
}

export {createWFST};