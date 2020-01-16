Geogem.applicatieSettings = {


	baseLayers: [{
			title: 'Luchtfoto',
			url: '//' + location.host + '/mapproxy/service',
			params: {
				layers: 'basisluchtfoto', // geowebcache layer
				format: 'image/png'
			},
			options: {
				//transitionEffect:'resize'
			}
		},
		{ // LET OP!!! WE HERDEFINIEREN KAART HIER OMDAT WE DE OSM ONDERLAAG WILLEN
			title: 'OpenTopo',
			url: '//' + location.host + '/mapproxy/wms?',
			params: {
				layers: 'opentopo',
				format: 'image/png'
			},
			options: {
				// transitionEffect:'resize'
				singleTile: true,
				attribution: '<a target="_blank" href="//www.opentopo.nl">Bron: J.W. van Aalst, www.opentopo.nl </a> &nbsp;',
				opacity: 0.6,
			}
		}

	],


	overLays: [{
			type: 'wms',
			title: 'NHW vaarwegvakken',
			url: '//' + location.host + '/geoserver/wms',
			wmsinfoformat: 'application/vnd.ogc.gml', // text/plain, application/vnd.ogc.gml, application/vnd.ogc.gml/3.1.1, text/html

			params: {
				layers: 'nieuwegein:watergebruik_nhw_vaarwegvakken_app',
				format: 'image/png',

			},
			fields: {
				'nieuwegein:watergebruik_nhw_vaarwegvakken_app': {
					'VAARWEG_NAAM': 'Vaarwegnaam'
				}
			},
			options: {
				singleTile: true, // meaning:  request only ONE tile (instead of multiple)
				maxResolution: 14.0,
				visibility: true
			}
		},

		{
			type: 'wms',
			title: 'Waterbeheerders',
			url: '//' + location.host + '/geoserver/wms',
			wmsinfoformat: 'application/vnd.ogc.gml', // text/plain, application/vnd.ogc.gml, application/vnd.ogc.gml/3.1.1, text/html

			params: {
				layers: 'nieuwegein:watergebruik_waterbeheerders_app',
				format: 'image/png',
			},
			// fields: {
			// 'nieuwegein:watergebruik_waterbeheerders_app': {
			// 'TYPE' : 'Type',
			// 'OMSCHRIJVI' : 'Omschrijving'
			// }
			// },
			options: {

				singleTile: true, // meaning:  request only ONE tile (instead of multiple)
				maxResolution: 14.0,
				visibility: true
			}
		},
		{
			type: 'wms',
			title: 'Ligplaatsen recreatievaart',
			url: '//' + location.host + '/geoserver/wms',
			wmsinfoformat: 'application/vnd.ogc.gml', // text/plain, application/vnd.ogc.gml, application/vnd.ogc.gml/3.1.1, text/html

			params: {
				layers: 'nieuwegein:watergebruik_recreatievaart_app',
				format: 'image/png',
			},
			fields: {
				'nieuwegein:watergebruik_recreatievaart_app': {
					'TYPE': 'Type',
					//'SOORT' : 'Soort',
					'OMSCHRIJVING': 'Omschrijving'
				}
			},
			options: {

				singleTile: true, // meaning:  request only ONE tile (instead of multiple)
				maxResolution: 14.0,
				visibility: true,
				filter: true,
			}
		},
		{
			type: 'wms',
			title: 'NHW Kilometerpunten',
			url: '//' + location.host + '/geoserver/wms',
			//wmsinfoformat: 'application/vnd.ogc.gml', // text/plain, application/vnd.ogc.gml, application/vnd.ogc.gml/3.1.1, text/html

			params: {
				layers: 'nieuwegein:watergebruik_nhw_kilometermarkering_app',
				format: 'image/png',

			},

			options: {

				singleTile: true, // meaning:  request only ONE tile (instead of multiple)
				maxResolution: 14.0,
				visibility: true
			}
		}
	],

	sidebar: true,

	sidebarHide: 'mobile',

	legend: [{
			title: "Ligplaatsen",
			url: "//" + location.host + "/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=watergebruik_recreatievaart_app"
		},
		{
			title: "Waterbeheerders",
			url: "./legenda_beheerders.png"
		}
	],


	multiFilter: [{

		'SOORT': {
			TYPE: 'CHECKBOX',
			TITLE: 'Zones',
			OPTIONS: [{
					value: '3x_24uur',
					title: 'Max. 3x 24 uur'
				},
				{
					value: 'ontheffingshouders',
					title: 'Ontheffingshouders'
				},
				{
					value: 'wachtplaats',
					title: 'Wachtplaats'
				},
				{
					value: 'vaste_ligplaats',
					title: 'Vaste ligplaats'
				},
				{
					value: 'kleine_schepen',
					title: 'Vaste ligplaats kleine schepen'
				},
			]
		},

	}],

};

Geogem.applicatieInit = function () {

	// If you want a layermanager, do this:
	layermanager = new OpenLayers.Control.LayerSwitcher();
	// If you want only ONE layer viewable at a time (like it is a radio group)
	//layermanager.singleDataLayerView=true;
	// else do nothing (default is a normal layermanager) or do
	//layermanager.singleDataLayerView=false;
	Geogem.map.addControl(layermanager);
	layermanager.activate();
	// if you want the layermanager to be opened at startup:
	layermanager.maximizeControl();


	$('#OpenTopo').click();

	setTimeout(function () {
		Geogem.map.zoomTo(8);
	}, 10);

	multiFilter.filterLoader();
};