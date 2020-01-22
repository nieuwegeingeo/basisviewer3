import {bbox as bboxStrategy} from 'ol/loadingstrategy';
import GeoJSON from 'ol/format/GeoJSON';
import WFS from 'ol/format/WFS';
import {Image as ImageLayer,Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import ImageWMS from 'ol/source/ImageWMS';
import WMTS, {optionsFromCapabilities} from 'ol/source/WMTS';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import WMTSCapabilities from 'ol/format/WMTSCapabilities';
import {rdNew, ngExtent} from './projectionSetter';
import VectorSource from 'ol/source/Vector';
import {Stroke, Fill ,Style} from 'ol/style';
import {getWidth, getTopLeft} from 'ol/extent';
import {get as getProjection} from 'ol/proj';

function checkParameter(param, defValue) {
    return param !== undefined ?  param : defValue;
}
function createLayer(layerConfig) {
    let type = layerConfig.type;
    if (type.localeCompare('wms') === 0) {
        return createWMSLayer(layerConfig);
    } else if (type.localeCompare('wfs') === 0) {
       return createWFSLayer(layerConfig);
    } else if (type.localeCompare('wmts') === 0) {
        return createWMTSLayer(layerConfig);
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

    // function createWMTSLayer(layerConfig) {
    //     let projection = rdNew; //getProjection(layerConfig.matrixSet);
    //     let projectionExtent = projection.getExtent();
    //     let size = getWidth(projectionExtent) / 256;
    //     let resolutions = new Array(14);
    //     let matrixIds = new Array(14);
    //     for (let z = 0; z < 14; ++z) {
    //         resolutions[z] = size / Math.pow(2, z);
    //         matrixIds[z] = z;
    //     }
    //     console.log(size)
    //     let layer = new TileLayer({
    //         title: '' || layerConfig.title,
    //         source: new WMTS({
    //             url: layerConfig.url,
    //             attributions: '' || layerConfig.attribution,
    //             layer: layerConfig.layer,
    //             matrixSet: 'EPSG:28992',
    //             format: 'image/png',
    //             projection: projection,
    //             tileGrid: new WMTSTileGrid({
    //                 origin: getTopLeft(projectionExtent),
    //                 resolutions: resolutions,
    //                 matrixIds: matrixIds
    //             }),
    //             style: 'default',
    //             wrapX: true
    //         }),

    //         //visible: layerConfig.visible !== undefined ? layerConfig.visible : false,
    //     });
    //     console.log(layer);
    //     return layer;
    // }

     function createWMTSLayerAsync(layerConfig) {
        let parser = new WMTSCapabilities();
        let l = fetch(layerConfig.url).then(function(response) {
            return response.text();
          }).then(function(text) {
            let result = parser.read(text);
            let options = optionsFromCapabilities(result, {
              layer: layerConfig.layer,
              matrixSet: layerConfig.matrixSet
            });
            //console.log(options);
            return options;

        }).then(function(options) {
            let layer = new TileLayer({
                opacity: 1,
                source: new WMTS(options)
            });
            //console.log(layer);
            return layer;
        });
        return l;
    }

    function createWMTSLayer(layerConfig) {

        let projection = rdNew;
        let projectionExtent = projection.getExtent();
        console.log(getProjection('EPSG:28992'));
        let size = getWidth(projectionExtent) / 256;
        console.log(getWidth(projectionExtent));
        let resolutions = new Array(14);
        let matrixIds = new Array(14);
        let topLeft = getTopLeft(projectionExtent);
        for (var z = 0; z < 14; ++z) {
        // generate resolutions and matrixIds arrays for this WMTS
        resolutions[z] = size / Math.pow(2, z);
        matrixIds[z] = z;
        console.log(resolutions[z], matrixIds[z]);
        }
        let layer = new TileLayer({
            opacity: 0.7,
            title: layerConfig.title,
            source: new WMTS({
              attributions: layerConfig.attribution !== undefined ? layerConfig.attribution : false,
              url: layerConfig.url,
              layer: layerConfig.layer,
              matrixSet: layerConfig.matrixSet,
              format: layerConfig.format,
              projection: projection,
              tileGrid: new WMTSTileGrid({
                origin: topLeft,
                resolutions: resolutions,
                matrixIds: matrixIds
              }),
              style: 'default',
              wrapX: true
            })
          })
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