Geogem.geoserverAutorisatie('bedrijvenbestand_actualisatie_app');

Geogem.applicatieSettings = {

    baseLayers: [

        {
            title: 'Luchtfoto',
            url: '//' + location.host + '/mapproxy/service',
            params: {
                layers: 'basisluchtfoto',        // geowebcache layer
                format: 'image/png'
            },
            options: {
                //transitionEffect:'resize'
            }
        },

        {
            title: 'OpenTopo',
            url: '//' + location.host + '/mapproxy/service',
            params: {
                layers: 'opentopo',        // geowebcache layer
                format: 'image/png'
            },
            options: {
                opacity: 0.4,
                //transitionEffect:'resize'
            }
        },
],

overLays: [
        {
          type: 'wms',
          title: 'Speellocaties Buurten',
          url: '//' + location.host + '/geoserver/wms',
         //wmsinfoformat: 'application/vnd.ogc.gml', // text/plain, application/vnd.ogc.gml, application/vnd.ogc.gml/3.1.1, text/html
          params: {
             layers: 'nieuwegein:speellocaties_buurten_app',
             format: 'image/png',
             //buffer: 10
          },
          // fields: {
              // 'nieuwegein:speellocaties_locaties_app' : {
                    // 'LOCATIE' : 'Locatie',
                    // 'FEITCODE' : 'Feitcode',
                    // 'TOTAAL' : 'Aantal',
                    // 'DATUM' : 'Datum',
              // }
          // },
          options: {
            singleTile: true,
            visibility: true,
            displayInLayerSwitcher: false,
            //dowloadformat: 'excel',
            /*styles: [
                        {name:'Meldingen', style:'mor_data_2018_style'},
                        {name:'Heatmap', style:'mor_data_2018_heatmap_style'},

                    ],*/
            }
        },
        {
          type: 'wms',
          title: 'Speellocaties',
          url: '//' + location.host + '/geoserver/wms',
         wmsinfoformat: 'application/vnd.ogc.gml', // text/plain, application/vnd.ogc.gml, application/vnd.ogc.gml/3.1.1, text/html
          params: {
             layers: 'nieuwegein:speellocaties_locaties_app',
             format: 'image/png',
             buffer: 10
          },
          fields: {
              'nieuwegein:speellocaties_locaties_app' : {
                    'SPNR'              : 'Sp-nummer',
                    'BEHEERNUMMER'      : 'Beheernummer',
                    'LOCATIENAAM'       : 'Locatienaam',
                    'SPEELBUURT'        : 'Speelbuurt',
                    'HUIDIGE_CATEGORIE' : 'Huidige categorie',
                    'TYPE_ONTMOETING'   : 'Type ontmoeting',
                    'WORDT_TYPE_PLEK_1' : 'Wordt type plek (1)',
                    'WORDT_TYPE_PLEK_2' : 'Wordt type plek (2)',
                    'WORDT_CATEGORIE'   : 'Wordt Categorie',
                    'ADVIES_MAATREGELEN': 'Advies Maatregelen',
              }
          },
          options: {
            singleTile: true,
            visibility: true,
            }
        },




],

    //featureInfoScreen: true,
    sidebar: false,
    //sidebarHide: true,
    // styleSwitcher: true,
    infoUrl: null,
    //altLayerswitcher: true,
    //multiFilterType: 'laag',
    //infoTab: '<input class="text-filter feature-filter__TYPE_ONTMOETING"/>',
    multiFilter: [{


     }],
    legend: [
            {title:"Speellocaties",url:'//'+location.host+'/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=nieuwegein:speellocaties_locaties_app',scale:true},
            {title:"Speellocaties buurten",url:'speellocaties_buurten_legenda.png'}
        ],

};

Geogem.applicatieInit = function(){
    $('#OpenTopo').click();
};
