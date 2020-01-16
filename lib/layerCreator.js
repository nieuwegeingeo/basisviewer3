import {bbox as bboxStrategy} from 'ol/loadingstrategy';
import GeoJSON from 'ol/format/GeoJSON';
import WFS from 'ol/format/WFS';
import {Image as ImageLayer,Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import ImageWMS from 'ol/source/ImageWMS';
import {ngExtent} from './projectionSetter';
import VectorSource from 'ol/source/Vector';
import {Stroke, Fill ,Style} from 'ol/style';

function checkParameter(param, defValue) {
    return param !== undefined ?  param : defValue;
}
function createLayer(layerConfig) {
    let type = layerConfig.type;
    if (type.localeCompare('wms') === 0) {
        return createWMSLayer(layerConfig);
    } else if (type.localeCompare('wfs') === 0) {
       return createWFSLayer(layerConfig);
    } else if (type.localeCompare('tile') === 0) {
        console.log('tile layer');
    } else {
        console.log('vector layer');
    }

    function createWMSLayer(layerConfig) {
        let layer = new ImageLayer({
            title: '' || layerConfig.title,
            extent: ngExtent,
            source: new ImageWMS({
                url: layerConfig.url,
                attributions: '' || layerConfig.attribution,
                params: {
                    'LAYERS': layerConfig.params.layers,
                    'STYLES': checkParameter(layerConfig.params.styles, ''),
                    'BUFFER': checkParameter(layerConfig.params.buffer, 10),
                },
                serverType: function() {
                    if (typeof layerConfig.serverType === 'undefined') {
                        return layerConfig.url.match('geoserver') ? 'geoserver' : undefined;
                    } else {
                        return layerConfig.serverType;
                    }
                }(),
            }),
            visible: false,

        });
        for (let k in layerConfig.options) {
            layer.values_[k] = layerConfig.options[k];
        }
        return layer;
    }

    function createWFSLayer(layerConfig) {
        let source = new VectorSource ();
        let layer = new VectorLayer({
            title: '' || layerConfig.title,
            extent: ngExtent,
            source: source,
            strategy: function() {
                let strat = layerConfig.strategy;
                if (strat === 'bboxStrategy') {
                    return bboxStrategy;
                } else if (strat === undefined) {
                    return bboxStrategy;
                }
            }(),
            visible: layerConfig.options.visible === false ? false : true,
            style: function(){
                let lcStyle = layerConfig.options.style;
                let style = new Style({
                    stroke: new Stroke(lcStyle.stroke !== undefined ? lcStyle.stroke : {
                        color: 'rgba(0,0,255,1)',
                        width: 2
                    }),
                    fill: new Fill(lcStyle.fill !== undefined ? lcStyle.fill : {
                        color: 'rgba(0,0,255,1)',
                    })
                });

                if (lcStyle !== undefined) {
                    // lcStyle.stroke !== undefined ? style.stroke = Object.assign({}, style.stroke, lcStyle.stroke) : false;
                    // lcStyle.fill !== undefined ? style.fill = Object.assign({}, style.fill, lcStyle.fill) : false;
                }

                return style;
            }(),
        });
        let wfsRequest = new WFS().writeGetFeature({
            featureNS: layerConfig.options.featureNS,
            featureTypes: layerConfig.options.featureTypes,
            outputFormat: 'application/json',
            count: 1000,
        });
        fetch(layerConfig.url, {
            method: 'POST',
            body: new XMLSerializer().serializeToString(wfsRequest)
        }).then(function(response) {
            return response.json();
        }).then(function(json) {
            var features = new GeoJSON().readFeatures(json);
            source.addFeatures(features);
        }).catch(function(error){
            console.log(layerConfig.options.featureTypes, ' bestaat niet, probeer iets anders');
        });

        return layer;
    }

    function createVectorLayer(layerConfig) {
        let layer = new ImageLayer({
            title: '' || layerConfig.title,
            extent: ngExtent,
            source: new VectorLayer({
                url: layerConfig.url,
                format: layerConfig.format,
            })
        });
    }
}


export {createLayer};