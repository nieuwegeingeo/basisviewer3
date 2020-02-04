GeoApp.applicatieSettings = {
  // baseLayers: [
    // {
    //   type: 'wmts-capabilities',
    //   title: 'OpenTopo',
    //   url: 'http://geodev.nieuwegein.nl/mapproxy/service?',
    //   layer: 'opentopo',
    //   matrixSet: 'EPSG:28992',
    //   format: 'image/png',
    //   options: {isBaseLayer: true}
    // },
    // {
    //   type: 'wms',
    //   title: 'OpenTopo',
    //   url: 'http://geodev.nieuwegein.nl/mapproxy/service',
    //   params: {
    //     layers: 'opentopo',
    //     format: 'image/png'
    //   },
    //   options: {isBaseLayer: true}
    // },
    // {
    //   type: 'wms',
    //   title: 'Luchtfoto',
    //   url: 'http://geodev.nieuwegein.nl/mapproxy/service',
    //   params: {
    //     layers: 'basisluchtfoto',
    //     format: 'image/png'
    //   },
    //   options: {isBaseLayer: true}
    // },

  // ],


  overlays: [
    // Definitie van een WFS-laag //
    {
      type: 'wfs',
      title: 'Speellocaties Buurten wfs',
      url: 'http://geodev.nieuwegein.nl/geoserver/wfs',
      options: {
        format: 'wfs',
        version: "1.1.0",
        dataProjection: "EPSG:28992",
        featureNS: 'http://www.nieuwegein.nl',
        // Featuretypes moet altijd een Array zijn! //
        featureTypes: ['speellocaties_buurten_app'],
        visible: false,
        strategy: 'bboxStrategy',
        // Voeg simpele style toe in de WFS-laag //
        style: {
          fill: {
            color: 'rgba(0,255,0,1)'
          },
          stroke: {
            width: 4,
            color: 'rgba(0,0,255,1)',
          }
        }
      }
    },

    // Definitie van een WMTS-laag geparsed uit capabilities //
    {
      type: 'wmts',
      title: 'OpenTopo NGR',
      url: 'https://geodata.nationaalgeoregister.nl/tiles/service/wmts?',
      layer: 'opentopoachtergrondkaart',
      matrixSet: 'EPSG:28992',
      format: 'image/png',
      visible: false,
    },

    // {
    //   type: 'wmts-capabilities',
    //   title: 'OpenTopo Mapproxy',
    //   url: 'http://geodev.nieuwegein.nl/mapproxy/service?REQUEST=GetCapabilities&SERVICE=WMTS',
    //   layer: 'opentopo',
    //   matrixSet: 'EPSG:28992',
    //   format: 'image/png',
    //   visibility: false,
    // },
    {
      type: 'wms',
      title: 'Projectenkaart',
      url: 'http://geodev.nieuwegein.nl/geoserver/wms',
      params: {
        layers: 'nieuwegein:projectenkaart_app',
        format: 'image/png',
        buffer: 10,
      },
      options: {
        wmsinfoformat: 'application/vnd.ogc.gml',
        filter: [{
          'PROJECTCODE': {
            'TITLE': 'Projectcode',
            'TYPE':'TEXT',
          },
          'OMSCHRIJVING': {
            'TITLE': 'Omschrijving',
            'TYPE':'TEXT',
          }
        }],
        legend: true,
        visible: true,
      }
    },
    // Definitie van een WMS-laag //
    {
      type: 'wms',
      title: 'Speellocaties',
      url: 'http://geodev.nieuwegein.nl/geoserver/wms',
      params: {
        layers: 'nieuwegein:speellocaties_locaties_app',
        format: 'image/png',
        buffer: 10,
        //cql_filter: "SPEELBUURT like '%Prelude%'"
      },
      options: {
        // WMS featureinfo, alleen application gml werkt voor nu //
        wmsinfoformat: 'application/vnd.ogc.gml', // text/plain, application/vnd.ogc.gml, application/vnd.ogc.gml/3.1.1, text/html
        fields: {
          'nieuwegein:speellocaties_locaties_app': {
            'SPNR': 'Sp-nummer',
            'BEHEERNUMMER': 'Beheernummer',
            'LOCATIENAAM': 'Locatienaam',
            'SPEELBUURT': 'Speelbuurt',
            'HUIDIGE_CATEGORIE': 'Huidige categorie',
            'TYPE_ONTMOETING': 'Type ontmoeting',
            'WORDT_TYPE_PLEK_1': 'Wordt type plek (1)',
            'WORDT_TYPE_PLEK_2': 'Wordt type plek (2)',
            'WORDT_CATEGORIE': 'Wordt Categorie',
            'ADVIES_MAATREGELEN': 'Advies Maatregelen',
          }
        },
        // Single tile, default is multi tile //
        singleTile: true,

        // De URL voor de legenda voor het tonen in de layerswitcher, true voor automatische legenda of URL voor eigen legenda //
        legend: true,

        // Regelt of de legenda mee schaalt met kaartschaal //
        legendScale: true,

        // De schaal waarop de laag klikbaar word in de layermanager //
        layerScale: 30000,

        // Zet de laag visibility bij het laden van de app //
        visible: true,

        // Verbergt de laag in de layerswitcher //
        hideInLayerManager: false,

        // Create filter for the layer //
        filter: [{
          'SPEELBUURT': {           // Set filter Field //
            'TITLE': 'Speelbuurt',  // Set filter title //
            'TYPE':'TEXT',          // Set filter type //
            //'VALUE': 'Prelude',     // Set a base value //
          },
          'BEHEERNUMMER': {
            'TITLE': 'Beheernummer',
            'TYPE':'TEXT',
          },
          'LOCATIENAAM': {
            'TITLE': 'Locatienaam',
            'TYPE':'TEXT',
          },
          'HUIDIGE_CATEGORIE': {
            'TITLE': 'Huidige Categorie',
            'TYPE':'SELECT',
            'OPTIONS': [
              {value: 'geen',title:'Geen', isnull: true},
              {value: 'informeel',title:'Informeel'},
              {value: '0 t/m 5 jaar',title:'0 t/m 5 jaar'},
              {value: '0 t/m 11 jaar',title:'0 t/m 11 jaar'},
              {value: '0 t/m 18 jaar',title:'0 t/m 18 jaar'},
              {value: '6 t/m 11 jaar',title:'6 t/m 11 jaar'},
              {value: '6 t/m 18 jaar',title:'6 t/m 18 jaar'},
              {value: '12 t/m 18 jaar',title:'12 t/m 18 jaar'}, //, selected: true}, // Selected sets this as the base value //
              {value: 'ouder dan 18',title:'Ouder dan 18'},
            ]
          },
          'TYPE_ONTMOETING': {
            'TITLE': 'Type ontmoeting',
            'TYPE':'CHECKBOX',
            'OPTIONS': [
              {value: 'geen', title:'Geen', isnull:true}, // Isnull makes sure that database NULL values are added to this checkbox's value //
              {value: 'No Problem',title:'No Problem', selected: true},
              {value: 'Stay Around',title:'Stay Around', selected: true}, // Selected checks the checkbox //
              {value: 'What\'\'s Up',title:'What\'s Up'}, // Apostrophe has to be escaped with \ and needs an extra ' for the CQL to work so: ' becomes \'\' //

            ]
          },

        }],
      },
      serverType: 'geoserver',
    },
  ],

  // Activate Layermanager //
  layerManager: true,

  // Activate sidebar en verberg //
  sidebar: true,
  sidebarHide: true,

  // Set default zoom, center en extent //
  mapZoom: 4,
  mapCenter: [135089.1, 448762.5],
  //extent: [],

  // Maak een extra legenda en verberg//
  legend: [{
      title: 'test',
      url: "./legenda.png"
    },
    {
      title: 'test1',
      url: "./legenda.png"
    },
  ],
  legendHide: true,

  // Forceert featureinfo popup ondanks Sidebar settings //
  forceInfoPopup: false,
};

// Extra uit te voeren Javascript code //
GeoApp.applicatieInit = function () {

};