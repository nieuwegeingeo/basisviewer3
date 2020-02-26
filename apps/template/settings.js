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
        layers: 'nieuwegein:projectenkaart_edit_app',
        styles: 'projectenkaart_groep_app',
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
        wfstEdit: [{
          'FID': {
            'TITLE': 'FID',
            'TYPE':'ID',
          },
          'PROJECTCODE': {
            'TITLE': 'Projectcode',
            'TYPE':'TEXT',
            //'DISABLED': true,
          },
          'OMSCHRIJVING': {
            'TITLE': 'Omschrijving',
            'TYPE':'TEXTAREA',
            // 'VALUE': 'Bla Bla Bla'
          },

          'HOOFDGROEP': {
            'TITLE': 'Hoofdgroep',
            'TYPE':'SELECT',
            'OPTIONS': [
              {value: '',title:''},
              {value: 'Openbaar Domein',title:'Openbaar Domein'},
              {value: 'Ruimtelijk Domein',title:'Ruimtelijk Domein'},
              {value: 'Sociaal Domein',title:'Sociaal Domein'},
              {value: 'Wijkcoordinatoren',title:'Wijkcoordinatoren'},
            ]
          },

          // 'SECTION-1-1': {CONTENT: '<table><tbody><tr><td>',TYPE: 'ELEMENT'},

          'RD_PROG_SOORTEN_GEBOUWEN':{
            TITLE: 'Soorten gebouwen',
            TYPE: 'CHECKBOX',
            OPTIONS: [
              {value:'Buurthuis', title:'Buurthuis'},
              {value:'Culturele functie', title:'Culturele functie'},
              {value:'Detailhandel', title:'Detailhandel'},
              {value:'Fabriek', title:'Fabriek'},
              {value:'Infrastructuur', title:'Gebouw voor infrastructuur'},
              {value:'Kantoorgebouw', title:'Kantoorgebouw'},
              {value:'Opslag', title:'Opslag'},
              {value:'Religieus gebouw', title:'Religieus gebouw'},
              {value:'Woningen', title:'Woningen'},
            ]
          },

          // 'SECTION-1-2': {CONTENT: '</td><td>',TYPE: 'ELEMENT'},

          'RD_PROG_DOELGROEP':{
            TITLE: 'Doelgroep',
            TYPE: 'CHECKBOX',
            OPTIONS: [
              {value:'Niet van toepassing', title:'Niet van toepassing'},
              {value:'Seniorenwoningen', title:'Seniorenwoningen'},
              {value:'Starterswoningen', title:'Starterswoningen'},
              {value:'Stijgers', title:'Stijgers'},
              {value:'Zorgwoningen', title:'Zorgwoningen'},
            ]
          },
          // 'SECTION-1-3': {CONTENT: '</td></tr></tbody></table>',TYPE: 'ELEMENT'},
          'GEOM': {
            'TITLE': 'GEOM',
            'TYPE':'GEOMETRY',
          }
        }],
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
        wfstEdit: [{
          'ID': {
          'TITLE': 'FID',
          'TYPE':'ID',
          },
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

  // Set default zoom, center en extent //
  mapZoom: 7,
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

  // Force Authorisation by for example connecting to a secure Geoserver layer //
  authorisation: {
    serverUrl: 'http://geodev.nieuwegein.nl/geoserver',
    layerName: 'projectenkaart_edit_app'
  },
};

// Extra uit te voeren Javascript code //
GeoApp.applicatieInit = function () {

};