GeoApp.applicatieSettings = {
  // baseLayers: [
  //   {
  //     title: 'OpenTopo',
  //     url: 'http://geodev.nieuwegein.nl/mapproxy/service',
  //     params: {
  //       layers: 'opentopo',
  //       format: 'image/png'
  //     },
  //     options: {
  //       opacity: 0.4,
  //     }
  //   },
  //
  //   {
  //     title: 'Luchtfoto',
  //     url: 'http://geodev.nieuwegein.nl/mapproxy/service',
  //     params: {
  //       layers: 'basisluchtfoto',
  //       format: 'image/png'
  //     },
  //     options: {
  //     }
  //   },
  // ],


  overLays: [
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

    {
      type: 'wms',
      title: 'Speellocaties Buurten',
      url: 'http://geodev.nieuwegein.nl/geoserver/wms',
      params: {
        layers: 'nieuwegein:speellocaties_buurten_app',
        format: 'image/png',
        buffer: 5
      },
      options: {
        singleTile: true,
        visible: true,
        displayInLayerSwitcher: false,
        wmsinfoformat: 'application/vnd.ogc.gml', //'application/vnd.ogc.gml', // text/plain, application/vnd.ogc.gml, application/vnd.ogc.gml/3.1.1, text/html
        fields: {
          'nieuwegein:speellocaties_buurten_app': {
            'TYPE': 'Type',
            'SPEELBUURT': 'Speelbuurt',
            'AANTAL_SPEELLOCATIES': 'Aantal Speellocaties',
          }
        },
        legend: true,
        // hideInLayerManager: true,
        //dowloadformat: 'excel',
        /*styles: [
                    {name:'Meldingen', style:'mor_data_2018_style'},
                    {name:'Heatmap', style:'mor_data_2018_heatmap_style'},
                ],*/
        filter: [{
          'SPEELBUURT': {
            'TITLE': 'Speelbuurt',
            'TYPE':'TEXT',
          }
        }],
      },
      // attribution: 'Test attribution',
    },
    {
      type: 'wms',
      title: 'Speellocaties',
      url: 'http://geodev.nieuwegein.nl/geoserver/wms',
      params: {
        layers: 'nieuwegein:speellocaties_locaties_app',
        format: 'image/png',
        buffer: 10
      },
      options: {
        // wmsinfoformat: 'application/vnd.ogc.gml', // text/plain, application/vnd.ogc.gml, application/vnd.ogc.gml/3.1.1, text/html
        singleTile: true,
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

        // De URL voor de legenda voor het tonen in de layerswitcher //
        legend: 'http://geodev.nieuwegein.nl/ol6/apps/projectenkaart/',
        // Regelt of de legenda mee schaalt met kaartschaal //
        legendScale: true,

        // De schaal waarop de laag klikbaar word in de layermanager //
        layerScale: 30000,

        // Zet de laag visibility bij het laden van de app //
        visible: true,

        // Verbergt de laag in de layerswitcher //
        hideInLayerManager: false,

        // Maak een filter voor de laag //
        filter: [{
          'SPEELBUURT': {
            'TITLE': 'Speelbuurt',
            'TYPE':'TEXT',
          }
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

  // Set default zoom en center //
  mapZoom: 7,
  mapCenter: [135089.1, 448762.5],

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