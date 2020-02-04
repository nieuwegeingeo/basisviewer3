import {createNode} from './nodeCreator';

// Creates a legend in the layermanager //
function createLayerLegend(layerItem, layer, map) {
    let layerId = layer.ol_uid;
    let legendScale = layer.values_.legendScale === true ? true : false;
    let resolution = map.getView().getResolution();
    let layerLegendUrl = '';
    if (layer.values_.legend === true) {
        layerLegendUrl = layer.getSource().getLegendUrl(resolution);
    } else if (typeof layer.values_.legend === 'string') {
        layerLegendUrl = layer.values_.legend;
    }
    // Create the legend node //
    createNode(`.layer-li-${layerId}`,'div',['layer-legend',`legend-${layerId}`]);
    let legendHead = createNode(`.legend-${layerId}`,'span',['layer-legend-head',`legend-head-${layerId}`, 'hidden'],'Legenda');
    let legendImage = createNode(`.legend-${layerId}`,'img',['layer-legend-image',`legend-image-${layerId}`, 'hidden'],'',[{'src':layerLegendUrl}]);
    // Make the legend collapsable //
    legendHead.addEventListener('click', function() {
        legendImage.classList.contains('hidden') ? legendImage.classList.remove('hidden') : legendImage.classList.add('hidden');
        legendHead.classList.contains('hidden') ? legendHead.classList.remove('hidden') : legendHead.classList.add('hidden');
    });
    // Makes the legend scale on map move //
    if (legendScale === true) {
        map.on('moveend', function() {
            let resolution = map.getView().getResolution();
            if (layer.values_.legend === true) {
                layerLegendUrl = layer.getSource().getLegendUrl(resolution);
            } else if (typeof layer.values_.legend === 'string') {
                layerLegendUrl = layer.values_.legend;
            }
            legendImage.src = layerLegendUrl;
        });
    }
}

// Creates a legendblock in the map where extra legends can be added //
function createExtraLegend(legendSettings,legendHide) {
    // Moves the attribution to the left //
    let attribution = document.querySelector('.ol-attribution');
    attribution.style.left = '.5rem';
    attribution.style.right = 'unset';
    let legendContainer = createNode(`.ol-overlaycontainer-stopevent`,'div',['extra-legend-container', 'ol-unselectable', 'ol-control']);
    let legendButton = createNode(`.extra-legend-container`,'button',['extra-legend-button'],'&#9660;',[{'title':'Legenda'}]);
    // Loop through the settings legend object and add the urls to the extra legend //
    for (var i=0;i<legendSettings.length;i++) {
        createNode(`.extra-legend-container`,'div',['extra-legend',`extra-legend-${i}`]);
        let legendHead = createNode(`.extra-legend-${i}`,'span',['extra-legend-head',`extra-legend-head-${i}`, 'hidden'],`${legendSettings[i].title}`);
        let legendImage = createNode(`.extra-legend-${i}`,'img',['extra-legend-image',`extra-legend-image-${i}`, 'hidden'],'',[{'src':legendSettings[i].url}]);
        legendHead.addEventListener('click', function() {
            legendImage.classList.contains('hidden') ? legendImage.classList.remove('hidden') : legendImage.classList.add('hidden');
            legendHead.classList.contains('hidden') ? legendHead.classList.remove('hidden') : legendHead.classList.add('hidden');
        });
    }

    // Makes the buttons open and collapse //
    legendButton.addEventListener('click', function() {
        if (legendContainer.classList.contains('ol-collapsed')) {
            legendContainer.classList.remove('ol-collapsed');
            legendButton.innerHTML = '&#9660;';
        } else {
            legendContainer.classList.add('ol-collapsed');
            legendButton.innerHTML = 'Legenda';
        }
    });
    // Check if the legend should be hidden by default //
    legendHide === true ? legendContainer.classList.add('ol-collapsed') :false;
    legendHide === true ? legendButton.innerHTML = 'Legenda' :false;
}

export {createLayerLegend, createExtraLegend};