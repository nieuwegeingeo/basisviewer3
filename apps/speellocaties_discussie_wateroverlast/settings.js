Geogem.geoserverAutorisatie('bedrijvenbestand_actualisatie_app');

Geogem.applicatieSettings = {

	baseLayers: [

		{
			title: 'Luchtfoto',
			url: '//' + location.host + '/mapproxy/service',
			params: {
				layers: 'basisluchtfoto',		// geowebcache layer
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
				layers: 'opentopo',		// geowebcache layer
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
		  title: '60mm WOL Kaart',
		  url: '//' + location.host + '/geoserver/wms',
		  params: {
			 layers: 'nieuwegein:klimaatadaptatie_wateroverlastkaart_60mm_v2_app',
			 format: 'image/png',
		  },
		  options: {
			singleTile: true,
			visibility: false,
            }
		},
        {
		  type: 'wms',
		  title: '100mm WOL Kaart',
		  url: '//' + location.host + '/geoserver/wms',
		  params: {
			 layers: 'nieuwegein:klimaatadaptatie_wateroverlastkaart_100mm_v2_app',
			 format: 'image/png',
		  },
		  options: {
			singleTile: true,
			visibility: false,
            }
		},
        /*
        {
		  type: 'wms',
		  title: 'Speellocaties',
		  url: '//' + location.host + '/geoserver/wms',
		 wmsinfoformat: 'application/vnd.ogc.gml', // text/plain, application/vnd.ogc.gml, application/vnd.ogc.gml/3.1.1, text/html
		  params: {
			 layers: 'nieuwegein:speellocaties_locaties_app',
			 format: 'image/png',
             buffer: 10,
             CQL_FILTER: "WORDT_TYPE_PLEK_1 = 'discussie plek' OR WORDT_TYPE_PLEK_2 = 'discussie plek'"
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
		},*/
        
        {
		  type: 'wms',
		  title: 'Speellocaties Waterovelast',
		  url: '//' + location.host + '/geoserver/wms',
		 wmsinfoformat: 'application/vnd.ogc.gml', // text/plain, application/vnd.ogc.gml, application/vnd.ogc.gml/3.1.1, text/html
		  params: {
			 layers: 'nieuwegein:speellocaties_wateroverlast_app',
			 format: 'image/png',
             buffer: 10,
		  },
          fields: {
              'nieuwegein:speellocaties_wateroverlast_app' : {
                    'SPNR'              : 'Sp-nummer',
                    'WORDT_TYPE_PLEK_1'   : 'Type',
                    'MINIMUM_ACCUMULATIE': 'Minimum accumulatie',
                    'MAXIMUM_ACCUMULATIE': 'Maximum accumulatie',
              }
          },
		  options: {
			singleTile: true,
			visibility: true,
            filter: true,
            downloadformat: 'excel'
            }
		},
        
        
        
       
],
    altLayerswitcher: true,
	sidebar: true,
    legend: [{
        title: 'Wateroverlastkaart',
        url:'legenda_wolk.png'
    }],
    
    multiFilter: [{

        'MAXIMUM_ACCUMULATIE': {
            TYPE: 'CHECKBOX',
            TITLE: 'Maximum accumulatie',
            OPTIONS: [
                {value:'51 - 100', title:'51 - 100'},
                {value:'101 - 200', title:'101 - 200'},
                {value:'201 - 300', title:'201 - 300'},
                {value:'301 - 500', title:'301 - 500'},
                {value:'501 - 1000', title:'501 - 1000'},
                {value:'1000 +', title:'1000 +'},
                {value: "') OR MAXIMUM_ACCUMULATIE IS NULL OR MAXIMUM_ACCUMULATIE IN ('", title:'Geen accumulatie'},
            ],
        },

    }],
};

Geogem.applicatieInit = function(){

    $('#OpenTopo').click();  

    multiFilter.filterLoader();
};
