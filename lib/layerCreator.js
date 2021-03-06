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
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import {getWidth, getTopLeft} from 'ol/extent';
import {get as getProjection} from 'ol/proj';

// Check if a parameter in settings is defined, otherwise give a default value //
function checkParameter(param, defValue) {
    return param !== undefined ?  param : defValue;
}
// Check which type and use the correct function //
function createLayer(layerConfig, t) {
    let type = t !== undefined ? t : layerConfig.type;
    if (type.localeCompare('wms') === 0) {
        return createWMSLayer(layerConfig);
    } else if (type.localeCompare('wfs') === 0) {
       return createWFSLayer(layerConfig);
    } else if (type.localeCompare('wmts') === 0) {
        return createWMTSLayer(layerConfig);
    } else if (type.localeCompare('wmts-capabilities') === 0) {
        return createWMTSLayerAsync(layerConfig);
    } else {
        createVectorLayer(layerConfig);
    }

    // Creates a new WMS layer from settings //
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
                    'CQL_FILTER': checkParameter(layerConfig.params.cql_filter, undefined),
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
            zIndex: 10,
        });
        for (let k in layerConfig.options) {
            layer.values_[k] = layerConfig.options[k];
        }
        return layer;
    }

    // Creates a new WMTS layer from capabilities, this is async //
    function createWMTSLayerAsync(layerConfig) {
        let parser = new WMTSCapabilities();
        let l = fetch(layerConfig.url + 'request=getcapabilities&SERVICE=WMTS').then(function(response) {
            return response.text();
          }).then(function(text) {
            let result = parser.read(text);
            let options = optionsFromCapabilities(result, {
              layer: layerConfig.layer,
              matrixSet: layerConfig.matrixSet
            });
            return options;
        }).then(function(options) {
            let layer = new TileLayer({
                opacity: 1,
                title: layerConfig.title,
                source: new WMTS(options),
                zIndex: 10,
            });
            for (let k in layerConfig.options) {
                layer.values_[k] = layerConfig.options[k];
            }
            return layer;
        });
        return l;
    }

    // Creates a WMTS layer //
    function createWMTSLayer(layerConfig) {
        let projection = rdNew;
        let projectionExtent = projection.getExtent();
        let size = getWidth(projectionExtent) / 256;
        let resolutions = new Array(14);
        let matrixIds = new Array(14);
        let topLeft = getTopLeft(projectionExtent);
        for (var z = 0; z < 14; ++z) {
        resolutions[z] = size / Math.pow(2, z);
        matrixIds[z] = z;
        }
        let layer = new TileLayer({
            title: layerConfig.title,
            source: new WMTS({
              attributions: checkParameter(layerConfig.attribution, false),
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
              wrapX: true,

            }),
            visible: checkParameter(layerConfig.visible, false),
            zIndex: checkParameter(layerConfig.zIndex, 10),
            opacity: checkParameter(layerConfig.opacity, 1),
          });
          return layer;
    }

    // Create a new WFS layer //
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
            zIndex: 10,
            visible: false,
            style: function() {
                let lcStyle = checkParameter(layerConfig.options.style, {});
                let style = new Style({
                    stroke: new Stroke(lcStyle.stroke !== undefined ? lcStyle.stroke : {
                        color: 'rgba(0,0,255,1)',
                        width: 2
                    }),
                    fill: new Fill(lcStyle.fill !== undefined ? lcStyle.fill : {
                        color: 'rgba(0,0,255,1)',
                    }),
                    image: new CircleStyle(lcStyle.image !== undefined ? lcStyle.image : {
                        radius: '7',
                        fill: new Fill (lcStyle.image !== undefined ? lcStyle.image.fill : {
                            color: 'rgba(0,0,255,1)',
                        }),
                        stroke: new Stroke(lcStyle.image !== undefined ? lcStyle.image.stroke : {
                            color: 'rgba(0,0,255,1)',
                            width: 2
                        }),
                    })
                });

                if (lcStyle !== undefined) {
                    // lcStyle.stroke !== undefined ? style.stroke = Object.assign({}, style.stroke, lcStyle.stroke) : false;
                    // lcStyle.fill !== undefined ? style.fill = Object.assign({}, style.fill, lcStyle.fill) : false;
                }
                return style;
            }(),

        });
        // layer.styleFunction_()[0].fill_.color_ = 'rgba(0,0,255,1)';
        for (let k in layerConfig.options) {
            layer.values_[k] = layerConfig.options[k];
        }
        let wfsRequest = new WFS().writeGetFeature({
            featureNS: layerConfig.options.featureNS,
            featureTypes: layerConfig.options.featureTypes,
            outputFormat: 'application/json',
            count: 1000,
        });
        layer.getSource().url_=layerConfig.url;
        fetch(layerConfig.url, {
            method: 'POST',
            body: new XMLSerializer().serializeToString(wfsRequest)
        }).then(function(response) {
            return response.json();
        }).then(function(json) {
            let geometryName = json.features[0].geometry_name;
            let features = new GeoJSON({extractGeometryName:true}).readFeatures(json);
            source.addFeatures(features);
        }).catch(function(error){
            console.log(layerConfig.options.featureTypes, ' bestaat niet, probeer iets anders');
        });

        return layer;
    }

    // Create a new vector layer //
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