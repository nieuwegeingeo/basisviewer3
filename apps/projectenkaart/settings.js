// Geogem.geoserverAutorisatie('projectenkaart_edit_app');

GeoApp.applicatieSettings = {

    overLays: [{
            type: 'wms',
            title: 'GBKNI',
            url: '//' + location.host + '/geoserver/wms',
            wmsinfoformat: 'application/vnd.ogc.gml', // text/plain, application/vnd.ogc.gml, application/vnd.ogc.gml/3.1.1, text/html
            params: {
                layers: 'nieuwegein:GM_SP_GBKNI_LIJNEN',
                format: 'image/png',
                query_layers: 'nieuwegein:GM_SP_GBKNI_LIJNEN'
            },

            options: {
                singleTile: true, // meaning:  request only ONE tile (instead of multiple)
                visibility: false,
            }
        },

        {
            type: 'wms',
            title: 'Projectenkaart',
            url: '//' + location.host + '/geoserver/wms',
            wmsinfoformat: 'application/vnd.ogc.gml', //'application/vnd.ogc.gml', // text/plain, application/vnd.ogc.gml, application/vnd.ogc.gml/3.1.1, text/html
            params: {
                layers: 'nieuwegein:projectenkaart_app',
                format: 'image/png',
                buffer: 5,
            },
            fields: {
                'nieuwegein:projectenkaart_app': {
                    'GROEP': 'Groep: ',
                    'PROJECTCODE': 'Projectcode: ',
                    'FASE': 'Fase: ',
                    'STATUS': 'Status: ',
                    'HOOFDGROEP': 'Hoofdgroep: ',
                    'SOORT': 'Soort:',
                    'OMSCHRIJVING': 'Omschrijving: ',
                    'PROJECTLEIDER_CONTACTPERSOON': 'Projectleider/Contactpersoon: ',
                    'CHECK_DOOR_COLLEGA': 'Check door collega: ',
                    'UPDATE_STATUS': 'Update status: ',
                    'LOCATIE': 'Locatie: ',
                    'WIJK': 'Wijk: ',
                    'JAAR': 'Jaar:',

                }
            },
            options: {
                singleTile: true, // meaning:  request only ONE tile (instead of multiple)
                visibility: true,
                styles: [{
                        name: 'Hoofdgroep',
                        style: 'projectenkaart_hoofdgroep_app_ysld'
                    },
                    {
                        name: 'Groep',
                        style: 'projectenkaart_groep_app_style'
                    },
                    {
                        name: 'Soort',
                        style: 'projectenkaart_soort_app_ysld'
                    },
                ],
                filter: true,
                downloadformat: 'excel'
            }
        },

    ],

    legend: [
        //{title:"Groep" ,url:'//'+ location.host +'/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=projectenkaart_hoofdgroep_app_ysld'},
        {
            title: "Hoofdgroep",
            url: './legenda_hoofdgroep.png'
        },
        //{title:"Soort",url:'//'+ location.host +'/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=projectenkaart_soort_app_ysld'}
    ],

    layerManager: true,

    printExtension: true,

    sidebar: true,

    infoUrl: './info.html',

    styleSwitcher: false,

    formContainer: true,

    multiFilter: [{


        'PROJECTCODE': {
            TYPE: 'TEXT',
            TITLE: 'Projectcode',
        },

        'OMSCHRIJVING': {
            TYPE: 'TEXT',
            TITLE: 'Omschrijving',
        },

        'HOOFDGROEP': {
            TYPE: 'CHECKBOX',
            TITLE: 'Verantwoordelijk domein',
            OPTIONS: [{
                    value: 'Extern',
                    title: 'Extern'
                },
                {
                    value: 'Openbaar Domein',
                    title: 'Openbaar Domein'
                },
                {
                    value: 'Ruimtelijk Domein',
                    title: 'Ruimtelijk Domein'
                },
                {
                    value: 'Sociaal Domein',
                    title: 'Sociaal Domein'
                },
                {
                    value: 'Wijkcoordinatoren',
                    title: 'Wijkcoördinatoren'
                },
            ]
        },

        'JAAR': {
            TYPE: 'TEXT',
            TITLE: 'Jaar',
        },

        'FASE': {
            TITLE: 'Fase',
            TYPE: 'CHECKBOX',
            OPTIONS: [{
                    value: 'Loketfase',
                    title: 'Loketfase'
                },
                {
                    value: 'Initaitieffase',
                    title: 'Initaitieffase'
                },
                {
                    value: 'Haalbaarheidsfase',
                    title: 'Haalbaarheidsfase'
                },
                {
                    value: 'Contractfase',
                    title: 'Contractfase'
                },
                {
                    value: 'Voorbereidingsfase',
                    title: 'Voorbereidingsfase'
                },
                {
                    value: 'Definitiefase_ontwerpfase',
                    title: 'Definitiefase/ontwerpfase'
                },
                {
                    value: 'Realisatiefase',
                    title: 'Realisatiefase'
                },
                {
                    value: 'Nazorg_evaluatiefase',
                    title: 'Nazorg_evaluatiefase'
                },
            ]
        },

    }],

    snappingTarget: 'GBKNI',
};

// OPTIONAL applicationinit implementation
GeoApp.applicatieInit = function () {

    // layermanager = new OpenLayers.Control.LayerSwitcher();
    // Geogem.map.addControl(layermanager);
    // layermanager.activate();
    // layermanager.maximizeControl();

    $('#Kaart').click();

    GeoApp.map.getLayersByName('Kaart')[0].setOpacity(0.5);

    multiFilter.filterLoader();

    $('.point_icon').remove();

    $('#legendhead').click();
};