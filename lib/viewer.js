import Map from 'ol/Map';
import View from 'ol/View';
import {defaults as defaultControls, ScaleLine} from 'ol/control';
import GeoApp from './GeoApp';
import {createLayer} from './layerCreator';
import {rdNew, ngExtent, getDpi} from './projectionSetter';
import {buildLayerManager, createLayerManagerItem} from './layerManager';
import {addBaseLayerButton} from './toolbarCreator';
import {getFeatureInfo} from './featureInfo';
import {createSidebar} from './sidebarCreator';
import {createExtraLegend} from './legendCreator';
import * as selection from './layerSelection';

GeoApp.init = function () {
  let machineURL = 'http://geodev.nieuwegein.nl';
  let defaultZoom =  GeoApp.applicatieSettings.mapZoom !== undefined ?  GeoApp.applicatieSettings.mapZoom : 7;
  let defaultCenter =  GeoApp.applicatieSettings.mapCenter !== undefined ?  GeoApp.applicatieSettings.mapCenter : [134925, 449204];
  let defaultExtent =  GeoApp.applicatieSettings.extent !== undefined ?  GeoApp.applicatieSettings.extent : ngExtent;
  let mapOptions = {
    controls: defaultControls().extend([
      //new ScaleLine({bar: true, text: true})
    ]),
    layers: [],
    // target: 'map',
    view: new View({
      projection: rdNew,
      center: defaultCenter,
      extent: defaultExtent,
      zoom: defaultZoom,
      maxZoom: 16,
    })
  };
  let map = new Map(mapOptions);
  GeoApp.map = map;
  GeoApp.proj = rdNew;
  map.setTarget('map');

  addBaseLayers(map, map.getLayers());

  function addOverlayLayers(overlays) {
    return new Promise(resolve => {
    for (let key in overlays) {
      let layer = createLayer(overlays[key]);
      if (layer !== undefined && typeof layer.then == 'function') {
        layer.then((resolvedValue) => {
          map.addLayer(resolvedValue);
          createLayerManagerItem(resolvedValue, map);
        });
      } else {
        layer !== undefined? map.addLayer(layer) : false;
      }
    }
  });
  }
  addOverlayLayers(GeoApp.applicatieSettings.overlays);

  GeoApp.layers = map.getLayers();

  if (GeoApp.applicatieSettings.layerManager === true) {
      buildLayerManager(GeoApp.layers, GeoApp.map);
  }

  if (GeoApp.applicatieSettings.sidebar === true) {
    let sidebarHide = GeoApp.applicatieSettings.sidebarHide === true? true : false;
    createSidebar(sidebarHide);
  }

  let forceInfoPopup = GeoApp.applicatieSettings.forceInfoPopup === true? true : false;
  getFeatureInfo(map, GeoApp.layers, rdNew, forceInfoPopup);

  if (GeoApp.applicatieSettings.legend !== undefined) {
    let legendHide = GeoApp.applicatieSettings.legendHide === true? true : false;
    createExtraLegend(GeoApp.applicatieSettings.legend,legendHide);
  }

  function addBaseLayers(mapTarget, layerCollection) {

    let baseLayerArray = [
      {
        type: 'wms',
        title: 'OpenTopo',
        url: machineURL + '/mapproxy/service',
        params: {
          layers: 'opentopo',
          format: 'image/png'
        },
        options: {},
        attribution: 'Bron: J.W. van Aalst, <a src="www.opentopo.nl">www.opentopo.nl</a>',
      },
      {
        type: 'wms',
        title: 'Luchtfoto',
        url: machineURL + '/mapproxy/service',
        params: {
          layers: 'basisluchtfoto',
          format: 'image/png'
        },
        options: {},
        //attribution: 'Bron: Luchtfoto 2019',
      },
    ];

    if (GeoApp.applicatieSettings.baseLayers !== undefined) {
      baseLayerArray = GeoApp.applicatieSettings.baseLayers;
    }
    let i = 1;
    for (let key in baseLayerArray) {
      baseLayerArray[key].options = {};
      baseLayerArray[key].options.isBaseLayer = true;
      baseLayerArray[key].options.visible = false;
      baseLayerArray[key].options.zIndex = 1;
      let layer = createLayer(baseLayerArray[key]);
      if (layer !== undefined && typeof layer.then == 'function') {
        layer.then((resolvedValue) => {
          mapTarget.addLayer(resolvedValue);
          addBaseLayerButton(resolvedValue,layerCollection);
        });
      } else {
        layer !== undefined? mapTarget.addLayer(layer) : false;
        addBaseLayerButton(layer,layerCollection);
      }
    }
  }
};
window.GeoApp = GeoApp;
GeoApp.getLayersBy = selection.getLayersBy;