import WMSGetFeatureInfo from 'ol/format/WMSGetFeatureInfo';
import {createNode, removeNode} from './nodeCreator';
import {sidebarToggle} from './sidebarCreator';

// Get featureinfo for a layer //
function getFeatureInfo(map, layers, projection, forceInfoPopup) {
    let view = map.getView();
    let requestId = 1;
    map.on('singleclick', function(evt) {
        // Remove existing info-popup //
        if (document.getElementsByClassName('featureinfo-popup').length > 0 && document.getElementsByClassName(`.request-number-${requestId}`).length === 0) {
            removeNode('.featureinfo-popup');
            return false;
        }
        let resolution = view.getResolution();
        // Filter layers without wms featureinfo //
        let infoLayers = layers.array_.filter(layer => layer.values_.wmsinfoformat !== undefined && layer.values_.wmsinfoformat !== '');
        infoLayers.forEach(layer => {
            let sourceLayers = layer.getSource().params_.LAYERS;
            let requestedLayers = [];
            sourceLayers.match(',') ? requestedLayers = sourceLayers.split(',') : requestedLayers.push(sourceLayers);
            let infoFormat = layer.values_.wmsinfoformat === 'text/html' ? 'text/html' : 'application/vnd.ogc.gml/3.1.1';
            requestedLayers.forEach(queryLayer => {
                // Get feature info URL for the clicked layer //
                let url = layer.getSource().getFeatureInfoUrl(
                    evt.coordinate,
                    resolution,
                    projection,
                    {
                        'INFO_FORMAT': infoFormat,
                        'QUERY_LAYERS': queryLayer,
                        'feature_count':1000
                    });
                // Continue if there's an URL and the layer is visible //
                if(url && layer.getVisible() === true) {
                    fetch(url, {
                        headers: {
                            //'Access-Control-Allow-Origin': 'http://geodev.nieuwegein.nl'
                        }
                    })
                    .then(function(response) {
                        return response.text();
                    })
                    .then(function(response) {
                        // Use the appropriate function to parse the response //
                        if (infoFormat === 'text/html') {
                            htmlFeatureInfo(response);
                        } else if (response.match('gml:featureMembers')){
                            gmlFeatureInfo(evt, requestId, response, layer, queryLayer, forceInfoPopup);
                        }
                    });
                }
            });
        });
        requestId++;
    });
}

// Function to parse the GML feature info //
function gmlFeatureInfo(event, requestId, featureInfo, layer, queryLayer, forceInfoPopup) {
    let layerTitle = layer.values_.title;
    let features = new WMSGetFeatureInfo().readFeatures(featureInfo);
    let fieldSet = layer.values_.fields !== undefined ? layer.values_.fields[queryLayer] : [];
    let fieldKeys = [];
    for (let key in fieldSet) {
        fieldKeys.push(key);
    }
    let featureInfoArray = [];
    // Compare the returned field to the fields defined in settings and add the defined fields to featureInfoArray //
    features.forEach(feature => {
        if (fieldKeys.length > 0) {
            for (let key in feature.values_) {
                if (!fieldKeys.includes(key)) {
                    delete feature.values_[key];
                } else {
                    let fieldKey = fieldSet[key];
                    feature.values_[fieldKey] = feature.values_[key];
                    delete feature.values_[key];
                }
            }
        }
        featureInfoArray.push(feature.values_);
    });
    if (document.getElementsByClassName(`request-number-${requestId}`).length > 0) {
        addFeatures(featureInfoArray,layerTitle);
    } else {
        // Check for sidebar or popup to show the feature info //
        if (document.getElementsByClassName('sidebar').length > 0 && forceInfoPopup === false) {
             // Add the feature info body to the sidebar //
            let sidebar = document.querySelector('.sidebar');
            sidebar.classList.contains('ol-collapsed') ? sidebarToggle() : false;
            if (document.getElementsByClassName('featureinfo-content').length > 0 ) {
                removeNode('.featureinfo-content');
            }
            createNode('.sidebar-body','div',['featureinfo-content']);
            createNode('.featureinfo-content','div',[`request-number-${requestId}`]);
        }
        createNode(`.request-number-${requestId}`, 'div', ['featureinfo-body']);
        addFeatures(featureInfoArray,layerTitle,event);
        if (document.getElementsByClassName('featureinfo-popup').length > 0 ) {
            setPopupPos(event);
        }
    }
    // Add a table per feature to the feature info body //
    function addFeatures(featureArray,layerName,event) {
        let featureNumber = 1;
        if (document.getElementsByClassName('feature-details').length > 0) {
            featureNumber = document.getElementsByClassName('feature-details').length + 1 ;
        }
        featureArray.forEach(feature => {
            let node = createNode('.featureinfo-body', 'details', [`feature-${featureNumber}`,'feature-details']);
            createNode(`.feature-${featureNumber}`, 'summary', ['feature-summary'], `${layerName}`);
            createNode(`.feature-${featureNumber}`, 'table', ['feature-table'], `<tbody></tbody>`);
            for (let key in feature) {
                createNode(`.feature-${featureNumber} table tbody`, 'tr', [], `<td>${key}</td><td>${feature[key]}</td>`);
            }
            featureNumber === 1 ? node.setAttribute('open',true) : false;
            featureNumber++;
        });
    }
}

function htmlFeatureInfo(featureInfo) {
    //console.log(featureInfo);
}

export {getFeatureInfo};