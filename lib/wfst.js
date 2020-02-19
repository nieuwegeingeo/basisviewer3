import {createNode,removeNode} from './nodeCreator';
import {Draw, Modify, Snap, Select} from 'ol/interaction';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import {createLayer} from './layerCreator';
import {equalTo as equalToFilter,like as likeFilter,and as andFilter, or as orFilter} from 'ol/format/filter';
import {createLayerManagerItem} from './layerManager';
import { getLayerByUid } from './layerSelection';
import {addToolbarButton} from './toolbarCreator';
import {GML, WFS} from 'ol/format';
import { click, pointerMove } from 'ol/events/condition';
import {dragElement} from './dragElement';


// Add wfst functions to the layer //
function createWFST(layers) {
    GeoApp.wfst = {};

    // Filter out the baselayers and hidden layers //
    let originLayers = layers.array_.filter(layer => layer.values_.isBaseLayer !== true && layer.values_.hideInLayerManager !== true);
    let layerArray = [];

    let wfstContainer = createNode('.ol-overlaycontainer-stopevent', 'div',['wfst-container','ol-control','ol-collapsed']);
    let dragBar = createNode('.wfst-container','div',['wfst-container-dragbar']);

    originLayers.forEach(function(layer) {
        //
        let layerId = layer.ol_uid;
        let parentNode = document.querySelector(`.layer-li-${layerId} .layermanager-item-container`);
        let editButton = document.createElement('div');
        editButton.classList.add(`edit-filler`, `input-edit-${layerId}`);
        parentNode.insertBefore(editButton, parentNode.firstChild);

        if (Array.isArray(layer.values_.wfstEdit)){
            let editFields = layer.values_.wfstEdit[0];
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
                    url: layer.getSource().getUrl().replace(/wms/g,'wfs'),
                    //filter: andFilter (likeFilter('PROJECTCODE','RD%','%'),equalToFilter('JAAR','2018')),
                    visible: false,
                    zIndex: 5,
                    editFields: editFields,
                },


            };

            let wfsLayer = createLayer(layerOptions, 'wfs');

            wfsLayer.values_.orgLayerID = layerId;
            layer.values_.wfsLayerID = wfsLayer.ol_uid;
            layerArray.push(wfsLayer);

            editButton.addEventListener('click', function() {
                editLayer(layer,editButton);
            });

            createNode('.wfst-container','div',['layer-wfst', `wfst-${wfsLayer.ol_uid}`, 'ol-collapsed']);
            createNode(`.wfst-${wfsLayer.ol_uid}`,'div',['wfst-button-container', `button-container-${wfsLayer.ol_uid}`]);
            let saveButton = createNode(`.button-container-${wfsLayer.ol_uid}`,'button',['wfst-button','wfst-button-save',`button-save-${wfsLayer.ol_uid}`],`Opslaan`);
            let deleteButton = createNode(`.button-container-${wfsLayer.ol_uid}`,'button',['wfst-button','wfst-button-delete',`button-delete-${wfsLayer.ol_uid}`],`Verwijder`);
            let cancelButton = createNode(`.button-container-${wfsLayer.ol_uid}`,'button',['wfst-button','wfst-button-cancel',`button-cancel-${wfsLayer.ol_uid}`],`Annuleer`);
            let modifyButton = createNode(`.button-container-${wfsLayer.ol_uid}`,'button',['wfst-button','wfst-button-modify',`button-modify-${wfsLayer.ol_uid}`],`Wijzig geometrie`);
            let wfstBody = createNode(`.wfst-${wfsLayer.ol_uid}`,'div',[`wfst-body-${layerId}`,'wfst-body']);
            let wfstContent = `<div class='wfst-title'><p>Wijzigen ${layer.values_.title}</p></div>`;

            for (let key in editFields) {
                //console.log(editFields)
                let disabled = editFields[key].DISABLED !== undefined ? 'disabled' : '';
                let val = editFields[key].VALUE !== undefined ? editFields[key].VALUE : '';
                if (editFields[key].TYPE.toLowerCase() === 'id') {

                    wfstContent += `<br><input class="wfst-input-id" name="${key}" type="text" value="${val}"></label>`;
                } else if (editFields[key].TYPE.toLowerCase() === 'text') {
                    wfstContent += `<br><label class="wfst-item"><span class="wfst-item-title">${editFields[key].TITLE}:</span><input class="wfst-input-text" name="${key}" type="${editFields[key].TYPE}" value="${val}" ${disabled}></label>`;
                } else if (editFields[key].TYPE.toLowerCase() === 'textarea') {
                    wfstContent += `<br><label class="wfst-item"><span class="wfst-item-title">${editFields[key].TITLE}:</span><textarea class="wfst-input-textarea" name="${key}" ${disabled}>${val}</textarea></label>`;
                } else if (editFields[key].TYPE.toLowerCase() === 'checkbox') {
                    wfstContent += `<br><div class="wfst-checkbox-container"><span class="wfst-item-title">${editFields[key].TITLE}: </span>`;
                    for (let z=0;z<editFields[key].OPTIONS.length;z++) {
                        editFields[key].OPTIONS[z].isnull === true ? editFields[key].OPTIONS[z].value += '__isnull' : false;
                        let sel = editFields[key].OPTIONS[z].selected === true ? 'checked' : '';
                        wfstContent += `<label class="wfst-checkbox-label">${editFields[key].OPTIONS[z].title}: <input type="checkbox"  class="wfst-input-checkbox" name="${key}" value="${editFields[key].OPTIONS[z].value}" ${sel}></label>`;
                    }
                    wfstContent += `</div>`;
                } else if (editFields[key].TYPE.toLowerCase() === 'select') {
                    wfstContent += `
                        <br><div class="wfst-item">
                        <span class="wfst-item-title">${editFields[key].TITLE}: </span>
                        <select class="wfst-input-select" name="${key}">`;
                    for (let z=0;z<editFields[key].OPTIONS.length;z++) {
                        editFields[key].OPTIONS[z].isnull === true ? editFields[key].OPTIONS[z].value += '__isnull' : false;
                        let sel = editFields[key].OPTIONS[z].selected === true ? 'selected' : '';
                        wfstContent += `<option value="${editFields[key].OPTIONS[z].value}" ${sel}>${editFields[key].OPTIONS[z].title}</option>`;
                    }
                    wfstContent += `</select></div>`;
                } else if (editFields[key].TYPE.toLowerCase() === 'element') {
                    wfstContent += editFields[key].CONTENT;
                }

            }

            wfstBody.innerHTML = wfstContent;
            saveButton.addEventListener('click', function () {
                saveEdits(wfsLayer, saveButton);
            });
            deleteButton.addEventListener('click', function () {
                deleteFeature(wfsLayer, deleteFeature);
            });
            cancelButton.addEventListener('click', function () {
                cancelEdits(wfsLayer, cancelEdits);
            });
            modifyButton.addEventListener('click', function () {
                modifyGeometry(wfsLayer, modifyGeometry);
            });
        }
    });
    layerArray.forEach(layer => GeoApp.map.addLayer(layer));
    // Add a dragbar to the wfst container
    dragElement(dragBar);
}

function editLayer(layer,editbutton) {
    // Turn feature info off while editing //
    GeoApp.featureInfo.active = false;
    removeEditInteractions();
    let wfsLayerId = layer.values_.wfsLayerID;
    let wfsLayer = getLayerByUid(GeoApp.layers,wfsLayerId)[0];
    // Collapse the sidebar //
    let sidebar = document.querySelector('.sidebar');
    sidebar !== null ? sidebar.classList.add('ol-collapsed') : false;
    document.querySelector('.edit-buttons-container') !== null ? removeNode('.edit-buttons-container'): false;
    if (editbutton.classList.contains('edit-on')) {
        editbutton.classList.remove('edit-on');
        wfsLayer.setVisible(false);
        GeoApp.featureInfo.active = true;
        return;
    }
    if (document.querySelector('.edit-on') !== null) {
        GeoApp.layers.array_.forEach(function(layer){
            layer.values_.title.match(/_wfs/g) !== null? layer.setVisible(false) : false;
        });
        document.querySelector('.edit-on').classList.remove('edit-on');
    }

    editbutton.classList.toggle('edit-on');
    wfsLayer.setVisible(true);

    let drawButtonPoint = addToolbarButton('draw-feature', 'edit-buttons');
    let drawButtonPolyline = addToolbarButton('draw-feature', 'edit-buttons');
    let drawButtonPolygon = addToolbarButton('draw-feature', 'edit-buttons');
    let editButton = addToolbarButton('edit-feature', 'edit-buttons');
    drawButtonPoint.classList.add('draw-point');
    drawButtonPolyline.classList.add('draw-polyline');
    drawButtonPolygon.classList.add('draw-polygon');

    document.querySelectorAll('.edit-buttons').forEach(function(button) {
        button.addEventListener('click', editButtonEvents);
    });

    function editButtonEvents() {
        removeEditInteractions();
        if (this.classList.contains('tool-active')) {
            this.classList.remove('tool-active');
            return;
        } else {
            if (document.querySelector('.edit-buttons.tool-active') !== null) {
                document.querySelector('.edit-buttons.tool-active').classList.remove('tool-active');
                this.classList.add('tool-active');
            } else {
                this.classList.add('tool-active');
            }
        }

        if (this.classList.contains('draw-point')) {
            setDrawInteraction(wfsLayer.getSource(),'Point');
        } else if (this.classList.contains('draw-polyline')) {
            setDrawInteraction(wfsLayer.getSource(),'LineString');
        }else if (this.classList.contains('draw-polygon')) {
            setDrawInteraction(wfsLayer.getSource(),'Polygon');
        }else if (this.classList.contains('edit-feature-button')) {
            // let modify = new Modify({source: wfsLayer.getSource()});
            // GeoApp.interactions.modify = modify;
            // GeoApp.map.addInteraction(GeoApp.interactions.modify);
            // modify.on('modifystart', function(e) {

            //     console.log(e);
            // });
            // modify.on('modifyend', function(e) {
            //     console.log(e);
            //     GeoApp.event = e;
            // });
            let selectArray = [];
            selectArray.push(wfsLayer);
            let select = new Select ({
                layers: selectArray,
                multi: true,
                condition: click,

            });
            GeoApp.interactions.select = select;
            GeoApp.map.addInteraction(GeoApp.interactions.select);
            select.on('select', function(e) {
                let featuresArray = select.getFeatures().array_;
                featuresArray.length > 1 ? featureList(featuresArray) : editAttributes(featuresArray[0], 'update', wfsLayer);
                select.features_.clear();
            });
        }

        wfsLayer.on('addfeature',function(e){console.log(e);});

        function setDrawInteraction(source,type) {
            let draw = new Draw ({
                name: 'draw-interaction',
                source: source,
                type: type,

            });
            GeoApp.interactions.draw = draw;
            GeoApp.map.addInteraction(GeoApp.interactions.draw);
            GeoApp.interactions.draw.on('drawend', drawEnd);
            function drawEnd(e) {
                GeoApp.wfst.feature = e.feature;
                WFStransaction('insert', e.feature, wfsLayer);
            }
        }

        function featureList(features) {
            console.log(features);
        }

    }
}

function editAttributes(feature, type, wfsLayer) {
    toggleEditContainer(wfsLayer);
    GeoApp.wfst.type = type;
    GeoApp.wfst.feature = feature;
    let editFields = wfsLayer.values_.editFields;
    for (let key in editFields) {
        if (editFields[key].TYPE === 'ID') {
            feature.setId(feature.values_[key]);
        }
    }

    for (let key in feature.values_) {
        let inputField = document.querySelector(`.wfst-item [name=${key}]`);
        let checkboxArray = document.querySelectorAll(`.wfst-checkbox-container [name="${key}"]`);
        if (inputField !== null) {
            if (typeof feature.values_[key] === 'string') {
                inputField.value = feature.values_[key];
            } else if (typeof feature.values_[key] === 'number') {
                inputField.value = feature.values_[key];
            }
        } else if (checkboxArray.length > 0) {
            if (typeof feature.values_[key] === 'string') {
                let values = feature.values_[key].split('|');
                checkboxArray.forEach(function(node) {
                    node.checked = false;
                    values.forEach(value => {
                        if (node.value === value) {
                            node.checked = true;
                        }
                    });

                });
            } else if (feature.values_[key] === null) {
                checkboxArray.forEach(function(node) {
                    node.checked = false;
                });
            }
        }
    }
    removeEditInteractions();
    toggleButtons();
}

function toggleEditContainer(wfsLayer) {
    let wfstContainer = document.querySelector('.wfst-container');
    let wfstItem = document.querySelector(`.wfst-${wfsLayer.ol_uid}`);
    if (wfstContainer.classList.contains('ol-collapsed')) {
        wfstContainer.classList.remove('ol-collapsed');
        wfstItem.classList.remove('ol-collapsed');
    } else {
        wfstContainer.classList.add('ol-collapsed');
        wfstItem.classList.add('ol-collapsed');
        let activeEditButton = document.querySelector('.edit-buttons.tool-active');
            if (activeEditButton !== null) {
            if (activeEditButton.classList.contains('edit-feature-button')) {
                GeoApp.map.addInteraction(GeoApp.interactions.select);
            } else if (activeEditButton.classList.contains('draw-feature-button')) {
                GeoApp.map.addInteraction(GeoApp.interactions.draw);
            }
        }
    }
}

function toggleButtons() {
    let buttonContainer = document.querySelector('.edit-buttons-container');
    if (buttonContainer.classList.contains('disabled')) {
        buttonContainer.classList.remove('disabled');
    } else {
        buttonContainer.classList.add('disabled');
    }
}

function removeEditInteractions() {
    GeoApp.map.removeInteraction(GeoApp.interactions.draw);
    GeoApp.map.removeInteraction(GeoApp.interactions.modify);
    GeoApp.map.removeInteraction(GeoApp.interactions.select);
}

function saveEdits(wfsLayer, button) {
    let inputArray = document.querySelectorAll('.wfst-item input,.wfst-item textarea,.wfst-item select');
    let checkboxArray = document.querySelectorAll('.wfst-checkbox-container');
    inputArray.forEach(function(node) {
        GeoApp.wfst.feature.values_[node.name] = node.value;
    });
    checkboxArray.forEach(function(node) {
        let value = '';
        let name = node.querySelector('input').name;
        node.querySelectorAll('input:checked').forEach(function(input) {
            if (value === '') {
                value = input.value;
            } else {
                value += `|${input.value}`;
            }
        });
        value !== '' ? GeoApp.wfst.feature.values_[name] = value : GeoApp.wfst.feature.values_[name] = null;
    });

    WFStransaction('update', GeoApp.wfst.feature, wfsLayer);
    toggleEditContainer(wfsLayer);
    toggleButtons();
}

function deleteFeature(wfsLayer, button) {
    WFStransaction('delete', GeoApp.wfst.feature, wfsLayer);
    wfsLayer.getSource().removeFeature(GeoApp.wfst.feature);
    toggleEditContainer(wfsLayer);
    toggleButtons();
}
function cancelEdits(wfsLayer, button) {
    let activeEditButton = document.querySelector('.edit-buttons.tool-active');
    toggleEditContainer(wfsLayer);
    toggleButtons();
}

function modifyGeometry(wfsLayer, button) {
    console.log(wfsLayer);
}

function WFStransaction(mode, f, wfsLayer) {
    let feature;
    let formatWFS = new WFS();
    let formatGML = new GML({
        featureNS: wfsLayer.values_.featureNS,
        featureType: wfsLayer.values_.featureTypes,
        srsName: GeoApp.map.getView().getProjection().code_,
    });
    let xs = new XMLSerializer();

    switch (mode) {
        case 'insert': {
            f.values_.GEOM = f.values_.geometry;
            feature = formatWFS.writeTransaction([f],null,null,formatGML);
            break;
        }
        case 'update': {
            let a = {};
            a.g = f.values_.geometry;
            f.values_.geometry !== undefined ? delete f.values_.geometry : false;
            feature = formatWFS.writeTransaction(null,[f],null,formatGML);
            f.values_.geometry = a.g;
            delete a.g;

            break;
        }
        case 'delete': {
            feature = formatWFS.writeTransaction(null,null,[f],formatGML);
            break;
        }
    }
    let data = xs.serializeToString(feature);
    fetch(wfsLayer.getSource().url_,{
        method: 'POST',
        body: data,
    }).then(response => {return response.text();})
    .then(text => {return new window.DOMParser().parseFromString(text, "text/xml");})
    .then(data => {
        GeoApp.getLayerByUid(GeoApp.layers,wfsLayer.values_.orgLayerID)[0].getSource().updateParams({"time": Date.now()});
        if (mode === 'insert') {
            let featureFid = data.getElementsByTagName('ogc:FeatureId')[0].attributes[0].nodeValue;
            fetch(wfsLayer.getSource().url_ + `?version=2.0.0&request=describeFeatureType&outputFormat=application/json&service=WFS&typeName=${featureFid.split('.')[0]}`)
                .then(response => {return response.json();})
                .then(json => {
                    let geomField = '';
                    for(let key in wfsLayer.values_.editFields) {
                        if (wfsLayer.values_.editFields[key].TYPE === 'GEOMETRY') {
                            geomField = key;
                        }
                    }
                    json.featureTypes[0].properties.forEach(prop => {
                        if (prop.name !== geomField) {
                            GeoApp.wfst.feature.values_[prop.name] = '';
                        } else if (GeoApp.wfst.feature.values_[geomField]) {
                            delete GeoApp.wfst.feature.values_[geomField];
                        }
                    });

                    fetch(wfsLayer.getSource().url_ + `?version=1.1.0&request=GetFeature&featureid=${featureFid}`)
                        .then(response => {return response.text();})
                        .then(text => {return new window.DOMParser().parseFromString(text, "text/xml");})
                        .then(data => {
                            let fName = featureFid.split('.')[0];
                            let fMembers = data.getElementsByTagName('gml:featureMembers');
                            let fields = Array.from(fMembers[0].children[0].children);
                            GeoApp.wfst.response = data;
                            GeoApp.wfst.fields = fields;

                            fields.forEach(function(node) {
                                for(let key in wfsLayer.values_.editFields) {
                                    if (wfsLayer.values_.editFields[key].TYPE !== 'GEOMETRY' && key === node.localName) {
                                        GeoApp.wfst.feature.values_[node.localName] = node.innerHTML;
                                    }
                                }
                            });
                            editAttributes(GeoApp.wfst.feature, 'update', wfsLayer);
                        });
                });
        }
    });
}
export {createWFST};