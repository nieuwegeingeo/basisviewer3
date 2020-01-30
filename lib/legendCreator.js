import {createNode} from './nodeCreator';
import {getScale} from './projectionSetter';

function createLayerLegend(layerItem, layer, map) {
    let layerId = layer.ol_uid;
    let layerUrl = layer.getSource().url_;
    let layerParam = layer.getSource().params_.LAYERS;
    let legendScale = layer.values_.legendScale === true ? true : false;
    let resolution = map.getView().getResolution();
    let layerLegendUrl = layer.getSource().getLegendUrl(resolution);

    createNode(`.layer-li-${layerId}`,'div',['layer-legend',`legend-${layerId}`]);
    createNode(`.legend-${layerId}`,'span',['layer-legend-head',`legend-head-${layerId}`, 'hidden'],'Legenda');
    createNode(`.legend-${layerId}`,'img',['layer-legend-image',`legend-image-${layerId}`, 'hidden'],'',[{'src':layerLegendUrl}]);

    let legendHead = document.querySelector(`.legend-head-${layerId}`);
    let legendImage = document.querySelector(`.legend-image-${layerId}`);

    legendHead.addEventListener('click', function() {
        legendImage.classList.contains('hidden') ? legendImage.classList.remove('hidden') : legendImage.classList.add('hidden');
        legendHead.classList.contains('hidden') ? legendHead.classList.remove('hidden') : legendHead.classList.add('hidden');
    });

    if (legendScale === true) {
        map.on('moveend', function() {
            let resolution = map.getView().getResolution();
            layerLegendUrl = layer.getSource().getLegendUrl(resolution);
            legendImage.src = layerLegendUrl;
        });
    }
}

function createExtraLegend(legendSettings,legendHide) {

    let attribution = document.querySelector('.ol-attribution');
    attribution.style.left = '.5rem';
    attribution.style.right = 'unset';
    createNode(`.ol-overlaycontainer-stopevent`,'div',['extra-legend-container', 'ol-unselectable', 'ol-control']);
    createNode(`.extra-legend-container`,'button',['extra-legend-button'],'&#9660;',[{'title':'Legenda'}]);
    for (var i=0;i<legendSettings.length;i++) {
        createNode(`.extra-legend-container`,'div',['extra-legend',`extra-legend-${i}`]);
        createNode(`.extra-legend-${i}`,'span',['extra-legend-head',`extra-legend-head-${i}`, 'hidden'],`${legendSettings[i].title}`);
        createNode(`.extra-legend-${i}`,'img',['extra-legend-image',`extra-legend-image-${i}`, 'hidden'],'',[{'src':legendSettings[i].url}]);

        let legendHead = document.querySelector(`.extra-legend-head-${i}`);
        let legendImage = document.querySelector(`.extra-legend-image-${i}`);

        legendHead.addEventListener('click', function() {
            legendImage.classList.contains('hidden') ? legendImage.classList.remove('hidden') : legendImage.classList.add('hidden');
            legendHead.classList.contains('hidden') ? legendHead.classList.remove('hidden') : legendHead.classList.add('hidden');
        });
    }

    let legendContainer = document.querySelector(`.extra-legend-container`);
    let legendButton = document.querySelector(`.extra-legend-button`);
    legendButton.addEventListener('click', function() {
        if (legendContainer.classList.contains('ol-collapsed')) {
            legendContainer.classList.remove('ol-collapsed');
            legendButton.innerHTML = '&#9660;';
        } else {
            legendContainer.classList.add('ol-collapsed');
            legendButton.innerHTML = 'Legenda';
        }
    });

    legendHide === true ? legendContainer.classList.add('ol-collapsed') :false;
    legendHide === true ? legendButton.innerHTML = 'Legenda' :false;
}

export {createLayerLegend, createExtraLegend};